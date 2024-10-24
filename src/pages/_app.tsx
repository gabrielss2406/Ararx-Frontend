import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import { FaCheckCircle, FaInfoCircle, FaTimesCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        visibleToasts={3}
        duration={2000}
        theme="dark"
        position="top-center"
        closeButton
        richColors
        icons={{
          success: <FaCheckCircle className="text-green-500" />,
          info: <FaInfoCircle className="text-blue-500" />,
          error: <FaTimesCircle className="text-red-500" />,
          warning: <FaExclamationTriangle className="text-yellow-500" />,
          loading: <FaSpinner className="animate-spin text-gray-500" />,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
