import { motion } from "framer-motion";
import { SignupForm } from "./auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <SignupForm />
      </motion.div>
    </div>
  );
}
