import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPayments } from '../Redux/slices/paymentSlice';
import { toast } from 'react-toastify';

const UserPayments = () => {
  const dispatch = useDispatch();
  const { userPayments, loading, error } = useSelector((state) => state.payment);
  const user = useSelector((state) => state.auth.user);

//   console.log(user)

  useEffect(() => {
    if (user?.email) {
      dispatch(getUserPayments(user.email));
    }
  }, [dispatch, user?.email]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>
      {userPayments.length === 0 ? (
        <p className="text-gray-600">No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Payment ID</th>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {userPayments.map((payment) => (
                <tr key={payment.payment_id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{payment.payment_id}</td>
                  <td className="py-2 px-4 border-b">{payment.order_id}</td>
                  <td className="py-2 px-4 border-b">${payment.amount}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(payment.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPayments; 