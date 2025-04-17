import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { createOrder, updatePayment } from '../Redux/slices/paymentSlice';
import { toast } from 'react-toastify';

const Services = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { order, loading, error } = useSelector((state) => state.payment);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const plans = [
    {
      id:1,
      title: "Basic Plan",
      features: [
        "Access to basic study materials",
        "5 hours of online tutoring per month",
        "Weekly practice tests",
        "Email support",
        "College List given",
      ],
      price: "500",
      highlight: false,
    },
    {
      id:2,
      title: "Complete Plan",
      features: [
        "Access to all study materials",
        "Unlimited online tutoring",
        "24/7 Priority support",
        "Personalized study plan",
        "Progress tracking",
      ],
      price: "2000",
      highlight: true,
    },
    {
      id:3,
      title: "Complete Plan",
      features: [
        "Access to all study materials",
        "Unlimited online tutoring",
        "24/7 Priority support",
        "Personalized study plan",
        "Progress tracking",
      ],
      price: "2000",
      highlight: true,
    },
  ];

  // console.log(user)

  // Load Razorpay script on component mount
  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          setRazorpayLoaded(false);
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpay();
  }, []);

  const handlePayment = async (plan) => {
    try {
      if (!razorpayLoaded) {
        toast.error('Payment system is not ready. Please try again in a moment.');
        return;
      }

      setSelectedPlan(plan);
      console.log(plan)
      
      // Create order
      const orderResponse = await dispatch(createOrder(plan.price)).unwrap();
      console.log(orderResponse)

      if (orderResponse.status === "created") {
        const options = {
          key: "rzp_test_vCPIAc2iDRqy6T",
          amount: orderResponse.amount,
          currency: 'INR',
          name: 'Concept Talk',
          description: `Payment for ${plan.title}`,
          order_id: orderResponse.id,
          handler: async function (response) {
            try {
              const paymentData = {
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                status: 'success',
                plan_id: plan.id
              };
              
              await dispatch(updatePayment(paymentData)).unwrap();
              console.log('Payment success processed:', result);
              toast.success('Payment successful!');
            } catch (error) {
              toast.error('Payment verification failed');
            }
          },
          prefill: {
            name: user?.name || '',
            email: user?.email || '',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp1 = new window.Razorpay(options);

        rzp1.on('payment.failed', async function (response) {
          try {
            const paymentData = {
              payment_id: response.error.metadata.payment_id,
              order_id: response.error.metadata.order_id,
              status: 'failure',
              plan_id: plan.id
            };
            console.log('Payment data being sent:', paymentData);
            
            await dispatch(updatePayment(paymentData)).unwrap();
            toast.error(`Payment failed: ${response.error.description}`);
          } catch (error) {
            toast.error('Failed to update payment status');
          }
        });

        rzp1.open();
      }
    } catch (error) {
      toast.error(error.message || 'Payment initialization failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center my-10">
          <span className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            PRICING
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mt-6">
            Choose the perfect plan for you
          </h1>
          <h2 className="text-2xl text-pink-600 italic mt-2">
            Start your Counselling journey today
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative group ${
                plan.highlight ? "transform md:-translate-y-4" : ""
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-pink-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                    RECOMMENDED
                  </span>
                </div>
              )}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-pink-200 group-hover:border-pink-400 transition-all duration-300">
                <div className="bg-pink-300/20 p-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {plan.title}
                  </h3>
                  <p className="text-pink-600 mt-1">{plan.subtitle}</p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                    ₹ {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>

                <div className="p-8 bg-white">
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-pink-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => handlePayment(plan)}
                  disabled={loading}
                    className="mt-8 w-full bg-pink-500 text-white py-3 px-6 rounded-xl font-semibold
                    transform transition-all duration-300 hover:scale-[1.02] hover:bg-pink-600 
                    focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 shadow-lg"
                  >
                    {loading && selectedPlan?.id === plan.id
                    ? 'Processing...'
                    : 'Get Started'}

                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 text-pink-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Secure payments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
