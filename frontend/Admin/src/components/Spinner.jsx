// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <motion.div
      className="flex items-center justify-center h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </motion.div>
  );
};

export default Spinner;
