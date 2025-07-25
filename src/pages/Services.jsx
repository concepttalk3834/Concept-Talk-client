import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { createOrder, updatePayment } from '../Redux/slices/paymentSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  // const { order, loading, error } = useSelector((state) => state.payment);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  
  const plans = [
    {
      id: 1,
      title: "Basic Plan",
      features: [
        "Full Counselling guidance and support till admission",
        "CSAB Guidance and support",
        "24*7 doubts solving through Text on Whatsapp",
        "Personalised choice filling list",
      ],
      price: "899",
      fixedPrice: "1000",
      highlight: false,
    },
    {
      id: 2,
      title: "Complete Plan",
      features: [
        "CSAB complete counselling process by Mentor",
        "One student : one mentor provided",
        "Doubt solving through calls and texts 24*7 ",
        "Choice filling of CSAB by expert Counsellors",
        "Regular Zoom calls with mentor",
        "Full guidance and support till you get admission",
        "100% guarantee to help you to get the best on your rank and preferences.",
        "Continuous discussion and suggestions through calls and texts"
      ],
      price: "1999",
      fixedPrice: "3000",
      highlight: true,
      tag: "Most Popular",
    },
    {
      id: 3,
      title: "Premium Plan",
      features: [
        "CSAB + State Engineering Colleges Counselling complete guidance and support",
        "One student : one mentor provided",
        "Doubt solving through calls and texts 24*7",
        "Choice filling of CSAB+ STATE ENGINEERING Colleges Counselling by Expert Counsellors",
        "Full guidance and support till you get admission.",
        "Regular Zoom calls with mentor",
        "100% guarantee to help you to get the best on your rank and preferences",
        "Continuous discussion and suggestions through calls and texts"
      ],
      price: "2999",
      fixedPrice: "5000",
      highlight: true,
      tag: "Expert Recommended",
    },
  ];

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

    // Cleanup function to remove the script when component unmounts
    return () => {
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  const handlePayment = async (plan) => {
    try {
      // Check if user is authenticated
      // if (!isAuthenticated) {
      //   toast.error('Please login to continue with the payment');
      //   navigate('/auth');
      //   return;
      // }

      // Check if Razorpay is loaded
      if (!razorpayLoaded) {
        toast.error('Payment system is loading. Please try again in a moment.');
        return;
      }

      setSelectedPlan(plan);
      
      // Create order
      // const orderResponse = await dispatch(createOrder(plan.price)).unwrap();

      // if (orderResponse.status === "created") {
        // const options = {
        //   key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        //   amount: orderResponse.amount,
        //   currency: 'INR',
        //   name: 'Concept Talk',
        //   description: `Payment for ${plan.title}`,
        //   order_id: orderResponse.id,
        //   handler: async function (response) {
        //     try {
        //       const paymentData = {
        //         payment_id: response.razorpay_payment_id,
        //         order_id: response.razorpay_order_id,
        //         status: 'success',
        //         plan_id: plan.id,
        //         signature: response.razorpay_signature,
        //       };
              
        //       const result = await dispatch(updatePayment(paymentData)).unwrap();
        //       toast.success('Payment successful! Redirecting to dashboard...');
        //       setTimeout(() => {
        //         navigate('/dashboard');
        //       }, 2000);
        //     } catch (error) {
        //       toast.error('Payment verification failed. Please contact support if amount was deducted.');
        //     }
        //   },
        //   prefill: {
        //     name: user?.name || '',
        //     email: user?.email || '',
        //   },
        //   theme: {
        //     color: '#FF69B4',
        //   },
        //   modal: {
        //     ondismiss: function() {
        //       toast.info('Payment cancelled');
        //       setSelectedPlan(null);
        //     }
        //   }
        // };

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: plan.price * 100,
          currency: 'INR',
          name: 'Concept Talk',
          description: `Payment for ${plan.title}`,
          handler: function (response) {
            toast.success('Payment successful! Please contact support for confirmation.');
            setTimeout(() => {
              navigate('/');
            }, 2000);
          },
          prefill: {
            name: '',
            email: '',
          },
          theme: {
            color: '#FF69B4',
          },
          modal: {
            ondismiss: function() {
              toast.info('Payment cancelled');
              setSelectedPlan(null);
            }
          }
        };

        const rzp1 = new window.Razorpay(options);

        // rzp1.on('payment.failed', async function (response) {
        //   try {
        //     const paymentData = {
        //       payment_id: response.error.metadata.payment_id,
        //       order_id: response.error.metadata.order_id,
        //       status: 'failure',
        //       plan_id: plan.id,
        //       error_code: response.error.code,
        //       error_description: response.error.description
        //     };
            
        //     await dispatch(updatePayment(paymentData)).unwrap();
        //     toast.error(`Payment failed: ${response.error.description}`);
        //     setSelectedPlan(null);
        //   } catch (error) {
        //     toast.error('Failed to update payment status. Please contact support.');
        //   }
        // });

        rzp1.on('payment.failed', function (response) {
          toast.error(`Payment failed: ${response.error.description}`);
          setSelectedPlan(null);
          // No need to call rzp1.close(); Razorpay will close the modal automatically
        });

        rzp1.open();
      // }
    } catch (error) {
      toast.error(error.message || 'Payment initialization failed. Please try again.');
      setSelectedPlan(null);
    }
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 mt-4">
          <div className="bg-pink-100 border border-pink-300 rounded-lg p-4 text-center">
            <span className="text-pink-700 font-extrabold text-lg mr-2">
              NOTE:-
            </span>
            <span className="text-pink-700 font-semibold text-lg">
              After doing payment, send the screenshot of payment along with your other details (Name, Mobile Number, Email, Percentile, Rank) 
              on <a
                href="https://wa.me/917642010280?text=Hi%2C%20I%20have%20completed%20the%20payment%20for%20Concept%20Talk.%20Here%20are%20my%20details%3A%20Name%3A%20%5BYour%20Name%5D%2C%20Mobile%3A%20%5BYour%20Mobile%5D%2C%20Email%3A%20%5BYour%20Email%5D%2C%20Percentile%3A%20%5BYour%20Percentile%5D%2C%20Rank%3A%20%5BYour%20Rank%5D.%20Screenshot%20attached."
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 underline font-bold hover:text-green-800 transition inline-flex items-center"
              >
                <FaWhatsapp className="inline-block mr-1 text-green-600 text-xl" />
                +91-7642010280
              </a>.
              <br />
              Thank you for trusting CONCEPT TALK.
            </span>
          </div>
        </div>
        <motion.div 
          className="text-center my-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* <span className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            PRICING
          </span> */}
          <h1 className="text-4xl font-bold text-gray-900 mt-6">
            Choose the perfect plan for you
          </h1>
          <h2 className="text-2xl text-pink-600 italic mt-2">
            Start your Counselling journey today
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
              className={`relative group ${
                plan.highlight ? "transform md:-translate-y-4" : ""
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-pink-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                    {plan.tag}
                  </span>
                </div>
              )}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-pink-200 group-hover:border-pink-400 transition-all duration-300">
                {/* <div className="absolute top-0 right-0 -mt-2 -mr-2">
                  {plan.highlight && (
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full shadow-lg transform rotate-12">
                      Best Value
                    </span>
                  )}
                </div> */}
                <div className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-20 -mr-20 h-40 w-40 bg-gradient-to-br from-pink-100 to-pink-200 transform rotate-45 opacity-20"></div>
                  <div className="relative z-10">
                    <div className="px-8 pt-8 pb-2">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-2xl font-bold text-gray-900 mr-2">
                              {plan.title}
                            </h3>
                            {plan.highlight && (
                              <span className="px-2 py-1 text-xs font-semibold text-pink-600 bg-pink-100 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-pink-600 mt-1 font-medium">{plan.subtitle}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-baseline">
                          <div className="flex items-start">
                            <span className="text-sm font-medium text-gray-500 mt-2">₹</span>
                            <span className="text-5xl font-extrabold tracking-tight text-gray-900">{plan.price}</span>
                          </div>
                          <span className="ml-1 text-xl font-semibold text-gray-500">/one-time</span>
                        </div>
                        {/* <div className="mt-1"> */}
                          {/* <span className="line-through text-lg text-gray-400">₹{plan.fixedPrice}</span> */}
                          {/* <span className="ml-2 text-sm text-green-500 font-medium">
                            Save {Math.round(((plan.fixedPrice - plan.price) / plan.fixedPrice) * 100)}%
                          </span> */}
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="bg-pink-300/20 p-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {plan.title}
                  </h3>
                  <p className="text-pink-600 mt-1">{plan.subtitle}</p>
                  <span className='line-through text-gray-900 text-4xl font-extrabold'>₹{plan.fixedPrice}</span>
                    <span className="text-gray-600 ml-2">/one-time</span>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ₹{plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">/one-time</span>
                  </div>
                </div> */}

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

                  <button
                    onClick={() => handlePayment(plan)}
                    disabled={selectedPlan?.id === plan.id}
                    className={`mt-8 w-full py-3 px-6 rounded-xl font-semibold
                      transform transition-all duration-300 hover:scale-[1.02]
                      focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 shadow-lg
                      ${selectedPlan?.id === plan.id
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-pink-500 hover:bg-pink-600 text-white'
                      }`}
                  >
                    {/* {loading && selectedPlan?.id === plan.id
                      ? 'Processing...'
                      : isAuthenticated
                        ? 'Get Started'
                        : 'Login to Purchase'} */}

                      Get Started
                  </button>
                </div>
              </div>
            </motion.div>
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
