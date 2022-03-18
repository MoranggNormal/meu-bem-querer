import { motion, AnimatePresence } from "framer-motion";

const WithTransition = ({children, key}) => {
 return(
  <AnimatePresence>
   <motion.div
    key={key}
    initial="initial"
    animate="animate"
    transition={{ delay: 0.2 }}
    variants={{
     initial: {
      opacity: 0,
     },
     animate: {
      opacity: 1,
     },
    }}
   >
    {children}
   </motion.div>
  </AnimatePresence>
 )
}

export default WithTransition;