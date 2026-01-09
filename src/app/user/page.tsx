"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Order, OrderDTO } from "@/interfaces/order";

const UserPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/orders/my-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const rawData: OrderDTO[] = await res.json();

          const formattedOrders = rawData.map((order) => {
            const items = order.items.map((item) => {
              // Convert types safely if they come as strings from API
              const price = Number(item.purchasePrice) || 0;
              const qty = Number(item.quantity) || 1;
              const totalPrice = Number(item.totalPrice) || price * qty;

              return {
                ...item,
                // Using 'name' directly from your OrderItemHistoryResponse record
                productName: item.name || "Товар",
                price: price,
                quantity: qty,
                totalPrice: totalPrice,
              };
            });

            const calculatedTotal = items.reduce(
              (acc, item) => acc + item.totalPrice,
              0
            );

            return {
              id: order.id,
              orderDate: order.createdAt || new Date().toISOString(),
              totalAmount: calculatedTotal,
              items: items,
            };
          });

          // Sort newest first
          formattedOrders.sort(
            (a, b) =>
              new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          );

          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, router]);

  if (!user) return null;

  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-[clamp(2rem,6vw,8rem)] py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl font-bold text-navy">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-navy">{user.username}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <div className="border-t border-gray-100 mt-6 pt-6">
                <button
                  onClick={logout}
                  className="w-full bg-gray-50 text-navy font-bold rounded-xl py-3 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  Вийти
                </button>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-navy mb-8">
              Історія замовлень
            </h1>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <div className="text-gray-400 text-xl mb-6">
                  У вас ще немає замовлень
                </div>
                <Link
                  href="/printings"
                  className="inline-block bg-teal text-white font-bold rounded-xl px-8 py-3 hover:bg-navy"
                >
                  До каталогу
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-6 border-b border-gray-50 pb-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          Замовлення №
                        </div>
                        <div className="text-lg font-bold text-navy">
                          #{order.id.slice(0, 8)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.orderDate).toLocaleString("uk-UA")}
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center"
                        >
                          <div>
                            {/* Displaying the name from the Record */}
                            <h4 className="font-bold text-navy">
                              {item.productName}
                            </h4>
                            <div className="text-sm text-gray-500">
                              {item.quantity} шт x {item.price} грн
                            </div>
                          </div>
                          <div className="font-bold text-navy">
                            {item.totalPrice} грн
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                      <div className="text-xl font-bold text-teal">
                        {order.totalAmount} грн
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
