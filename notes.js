/*🧩 What is Framer Motion?
Framer Motion ek React animation library hai — jo tumhe smooth, interactive, and physics-based animations banane deta hai with simple syntax.
Example:
import { motion } from "framer-motion"

const Box = () => {
  return (
    <motion.div
      animate={{ x: 100 }}
      transition={{ duration: 0.5 }}
      className="w-20 h-20 bg-blue-500"
    />
  )
}
Bas itna likhne se ek blue box 100px slide karega! Koi extra setup, timeline, ya boilerplate nahi chahiye.

⚡ Why use Framer Motion?
1. Declarative syntax → Tum “kya” chahte ho batate ho, “kaise” nahi.
2. React-friendly → Hooks, components, and props ke saath natural fit.
3. Variants system → Easily complex sequences & stagger animations bana sakte ho.
4. Exit animations → Component unmount hone pe bhi animation ho sakta hai.
5. Layout animations → Auto animate between layout changes (super smooth transitions).

🧠 Framer Motion vs GSAP (GreenSock Animation Platform) :
| Feature             | **Framer Motion**                            | **GSAP**                                                |
| ------------------- | -------------------------------------------- | ------------------------------------------------------- |
| **Target Audience** | React developers                             | Any JavaScript project                                  |
| **Syntax Style**    | Declarative (React props-based)              | Imperative (JS code-based)                              |
| **Ease of Use**     | Easy for React users                         | Steeper learning curve                                  |
| **Control**         | Good but limited for advanced control        | Extremely powerful and flexible                         |
| **Performance**     | Optimized for React apps                     | Ultra-optimized for all DOM/SVG/Canvas                  |
| **Use Case**        | UI transitions, interactive React components | Complex timelines, games, large-scale animation systems |
| **Learning Curve**  | Low                                          | Medium–High                                             |

🎯 When to use which?

🧱 Use Framer Motion when:
You’re working inside a React app.
You want component-based animations.
You need smooth UI transitions, page routes, or interactive effects.
You prefer simple declarative syntax (React-style).

🌀 Use GSAP when:
You need very detailed control over every animation step.
You’re working on canvas/SVG-heavy animations.
You’re not limited to React (e.g., landing pages, banners, complex sequences).
You want to create timelines or scroll-based advanced animations.

Motion Setup :
1. npm i motion
2. import { motion } from "motion/react"
3. div -> motion.div
Example :

const App = () => {
  return (
    <motion.div 
    initial={{
      x:10
    }}
    animate={{
      x:100,
      y:200,
      rotate:360
    }}
    transition={{
      duration:3,
      delay:1,
      repeat:Infinity,
      ease:'anticipate'
    }}
    className='box'>
    </motion.div>
  )
}
Agar hamlog animate mein x mein ek array pass kar denge like this, toh ye ek pura motion mein move karega jaise keyframe motion hota tha css mein:
animate={{
      x:[0,800,800,0,0],
      y:[0,0,300,300,0],
      rotate:360
}}

Agar kuch events par kuch karna chahe toh aise kar sakte hai hamlog :
whileHover={{
      backgroundColor: 'blue'
    }}
    whileTap={{
      scale:0.8
    }}

Agar hamlog drag karna chahe toh bas sirf drag likh denge toh drag hojayenge wo cheez apke cursor ke saath, itna hi asaan hai
"drag", bas hojayega

Hamlog chaye toh whileDrag bhi use kar sakte hai jaise hamlog whileHover ya whileTap use kar rhe the, but at present abhi kuch bhi constraints nahi hai that is jaha bhi bhejna chayenge waha chala jayega, usko agar hamlogo ko kuch boundaries dena ho toh kaise karenge chalo dekte hai :
dragConstraints={{
left: 0,
top: 0
}}
dragDirectionLock='true'

dragDirectionLock ye use karne se koi bhi ek axis mein move hoga either x axis mein jab ho rha hai, then y main nhi hoga and agar y mein kar rhe hai toh x main nhi hoga

Agar ab hamlog chaye ki scroll ka animation layenge that is ki jaise jaise hamlog scroll karenge waise waise wo scrollbaar age jaata jai:
import {motion,useScroll} from 'motion/react';
const scrollYProgress = useScroll().scrollYProgress;

<motion.div 
style={{
    scaleX:scrollYProgress
}}

Kuch kuch aur topics padh lete hai jo baaki reh gye the video mein se :

Chaalo ab dekte hai Variants kya hota hai and kaise use kar sakte hai haame - 
🧩 What are Variants (in Motion)?
Soch le bhai — tu ek element ke multiple states banana chahta hai:
ek “hidden” state, ek “visible” state, aur maybe ek “hovered” ya “clicked” state

Ab tu chaahe toh har jagah initial={{ ... }}, animate={{ ... }} likh sakta hai, par agar 5 elements same pattern se animate kar rahe hain, toh code bohot repetitive ho jaayega 😩

👉 Variants ka kaam hai —
yeh animation states ko ek jagah define karna, aur fir elements ko simply bolna:
“Bhai tu ab hidden hai” ya “visible hai”
Framer Motion samajh jaata hai ki us state ke liye kya properties use karni hain 💡

🎯 Basic -
import { motion } from "motion/react"

const boxVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

export default function Box() {
  return (
    <motion.div
      className="w-20 h-20 bg-blue-500 rounded-lg m-auto mt-40"
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8 }}
    />
  )
}
🧠 Breakdown:
1. boxVariants → ek object jisme states define hain:
{
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}
2. initial="hidden" → starting state
3. animate="visible" → final state
4. Framer Motion automatically animates between them 🚀

🔁 Why Variants Are Useful :
Code short aur clean hota hai
Same animation logic reuse kar sakte ho across many elements
Parent–child animation coordination easy ho jaata hai (staggered animations, etc.)

🧱 Example — Parent & Child Variants
Dekho bhai, isme magic dikhega 👇
import { motion } from "motion/react"

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // children ek ke baad ek animate honge
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function VariantsExample() {
  return (
    <motion.ul
      className="flex flex-col items-center gap-4 mt-20"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {["Home", "About", "Projects", "Contact"].map((text, i) => (
        <motion.li
          key={i}
          variants={item}
          className="p-4 bg-blue-600 text-white w-40 text-center rounded-xl"
        >
          {text}
        </motion.li>
      ))}
    </motion.ul>
  )
}
🌀 Kya ho raha hai:
1. Parent (motion.ul) ke paas container variants hain.
2. Children (motion.li) ke paas item variants hain.
3. Jab parent visible hota hai →
automatically sab children bhi visible variant play karte hain staggered delay ke saath ✨

🎮 Bonus: Hover & Tap Variants
import { motion } from "motion/react"

const btnVariants = {
  rest: { scale: 1, backgroundColor: "#3b82f6" },
  hover: { scale: 1.2, backgroundColor: "#2563eb" },
  tap: { scale: 0.95 },
}

export default function ButtonVariant() {
  return (
    <motion.button
      className="text-white font-semibold px-6 py-3 rounded-xl"
      variants={btnVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      Click Me
    </motion.button>
  )
}


🎬 Result →
Button hover pe zoom hota hai, click pe press hota hai — aur tumne likha sirf ek clean object 👌

🎯 1️⃣ Stagger Animations — (Ek ke baad ek animate hona)
🧠 Concept:
Jab tumhare paas multiple elements ho (jaise cards, list items, etc.) aur sab ek saath animate na ho ke ek ke baad ek appear ho — usse stagger animation kehte hain. 🧩 Example:
import { motion, AnimatePresence } from "motion/react"

const StaggerExample = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // 👈 Delay between each child
        delayChildren: 0.5,   // 👈 Delay before starting stagger
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-4 p-8"
    >
      {["Home", "About", "Projects", "Contact"].map((text, i) => (
        <motion.li
          key={i}
          variants={item}
          className="p-4 bg-blue-500 text-white rounded-xl w-40 text-center"
        >
          {text}
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default StaggerExample
🌀 Result: List items ek ke baad ek appear honge (0.3s gap ke saath) — smooth and natural transition 👌

🎯 2️⃣ Sequenced Animations — (Specific order me animations)
🧠 Concept:
Kabhi kabhi tumhe multiple elements ko ek defined order me animate karna hota hai — jaise pehle heading aaye, fir image, fir button. Iske liye timeline-like control chahiye hota hai.
🧩 Example using useAnimate hook (Framer Motion v11+)-
import { useAnimate } from "motion/react"
import { useEffect } from "react"

const SequenceExample = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const sequence = async () => {
      await animate(".heading", { opacity: 1, y: 0 }, { duration: 0.6 })
      await animate(".image", { scale: 1, opacity: 1 }, { duration: 0.5 })
      await animate(".button", { x: 0, opacity: 1 }, { duration: 0.5 })
    }

    sequence()
  }, [animate])

  return (
    <div ref={scope} className="flex flex-col items-center gap-4 mt-20">
      <h1 className="heading opacity-0 translate-y-10 text-3xl font-bold text-blue-400">
        Welcome Bro 👋
      </h1>
      <img
        src="https://placekitten.com/200/200"
        alt="cat"
        className="image opacity-0 scale-0 rounded-full"
      />
      <button className="button opacity-0 -translate-x-10 bg-blue-500 text-white py-2 px-4 rounded-xl">
        Get Started
      </button>
    </div>
  )
}

export default SequenceExample
🌀 Result:
1️⃣ Heading slides in →
2️⃣ Image scales up →
3️⃣ Button slides in →
Perfect “intro animation” type feel.

Chalo ab samajhte hai useAnimate and page transitions :
🧠 Part 1: useAnimate() — The “Timeline” Hook
⚙️ What it is:
useAnimate() ek Framer Motion hook hai (v10+ onwards) :— ye tumhe fine-grained control deta hai multiple animations ke sequence par — jaisa GSAP timeline, but React-friendly syntax me.

🧩 Basic Syntax:
import { useAnimate } from "motion/react"
import { useEffect } from "react"

function Example() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    // Animate specific elements inside scope
    animate(".box", { x: 100, rotate: 90 }, { duration: 0.6 })
  }, [animate])

  return (
    <div ref={scope}>
      <div className="box w-20 h-20 bg-blue-500" />
    </div>
  )
}
Breakdown:
1. scope: ek ref jahan ke andar ke elements ko tum target kar sakte ho by selector (jaise .box, .title, etc.)
2. animate: ek function jo directly DOM-like selectors pe animation apply karta hai
3. Syntax: animate(target, keyframes, options)
4. Ye async bhi hai, to tum sequence banana chahe toh await use kar sakte ho.

🪄 Example – Sequence Animation :
import { useAnimate } from "motion/react"
import { useEffect } from "react"

export default function SequenceDemo() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const sequence = async () => {
      await animate(".box1", { x: 150 }, { duration: 0.5 })
      await animate(".box2", { y: 80 }, { duration: 0.5 })
      await animate(".box3", { scale: 1.5 }, { duration: 0.5 })
    }
    sequence()
  }, [animate])

  return (
    <div ref={scope} className="flex gap-4 justify-center mt-20">
      <div className="box1 w-16 h-16 bg-red-500" />
      <div className="box2 w-16 h-16 bg-green-500" />
      <div className="box3 w-16 h-16 bg-blue-500" />
    </div>
  )
}
🌀 Result:
Box1 slides → then Box2 moves → then Box3 scales — ek controlled sequence, bina extra state ke.

🎬 Part 2: Page Transitions with AnimatePresence
⚙️ What it is:
AnimatePresence ek Framer Motion component hai jo React ke mount/unmount animations handle karta hai.
Matlab: jab component remove hota hai (like route change), tab bhi exit animation dikhega — normally React me ye impossible hota hai.

🧩 Example — Basic Fade Page Transition
👉 Suppose tumhare paas 2 pages hain: Home.jsx aur About.jsx

🏠 Home.jsx:
import { motion } from "motion/react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center bg-blue-600 text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl mb-4">Home Page</h1>
      <Link to="/about" className="underline">
        Go to About →
      </Link>
    </motion.div>
  )
}

📄 About.jsx :
import { motion } from "motion/react"
import { Link } from "react-router-dom"

export default function About() {
  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center bg-green-600 text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl mb-4">About Page</h1>
      <Link to="/" className="underline">
        ← Back to Home
      </Link>
    </motion.div>
  )
}

🧭 App.jsx (Routing + AnimatePresence) :
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "motion/react"
import Home from "./Home"
import About from "./About"

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
🎨 Result:
Jab tu Home → About navigate karega:
Home fade out + slide up
About fade in + slide up
Ekdam cinematic page feel ✨


🧠 Concept Overview: Scroll Animations
Framer Motion me scroll animations banane ke liye hum use karte hain:

✅ useScroll()
→ Scroll position track karta hai (0 se 1 tak normalized value deta hai).

✅ useTransform()
→ Scroll value ko kisi aur range me map karta hai (jaise opacity, translate, scale, etc.).

In dono ko mila ke — tum bana sakte ho
✨ fade-in on scroll,
🎢 parallax image effects,
💫 section reveal transitions,
aur bahut kuch.

🪜 Step-by-Step: Basic Scroll Animation
import { motion, useScroll, useTransform } from "motion/react"

export default function ScrollDemo() {
  const { scrollYProgress } = useScroll() // 👈 scroll progress value (0 → 1)

  // Mapping scroll progress to some animation values
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <div className="h-[200vh] bg-gray-900 flex flex-col items-center justify-center text-white">
      <motion.div
        style={{ scale, rotate }}
        className="w-32 h-32 bg-blue-500 rounded-2xl"
      />
      <p className="mt-20 text-xl opacity-70">Scroll down ⬇️</p>
    </div>
  )
}
🔍 Breakdown:
scrollYProgress → normalized scroll value between 0 and 1
useTransform() → converts scroll range into other property ranges (jaise 1→2 scale)
Result: box scroll ke saath zoom aur rotate hota hai 💫

🏔️ Parallax Effect Example
Parallax effect = jab background aur foreground different speeds se move karte hain → depth feel hoti hai 🎢

import { motion, useScroll, useTransform } from "motion/react"

export default function ParallaxExample() {
  const { scrollY } = useScroll()

  // background slow move
  const bgY = useTransform(scrollY, [0, 1000], [0, 200])
  // foreground faster move
  const fgY = useTransform(scrollY, [0, 1000], [0, -300])

  return (
    <div className="relative h-[200vh] overflow-hidden bg-gray-800">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
        }}
      />
      <motion.div
        style={{ y: fgY }}
        className="relative z-10 h-screen flex flex-col items-center justify-center text-white"
      >
        <h1 className="text-5xl font-bold drop-shadow-lg">Parallax Magic 🪄</h1>
        <p className="mt-4 text-lg opacity-80">Scroll to feel the depth!</p>
      </motion.div>
    </div>
  )
}
🌀 What Happens:
Background moves slightly (slowly scrolls)
Foreground moves opposite direction faster
Creates that cinematic parallax depth feel 🌄

🧩 Scroll-Triggered Reveal Animation (whileInView)
Kabhi tumhe chahiye hota hai ke element tabhi animate ho jab wo viewport me aaye
— iske liye use hota hai whileInView prop 👇
import { motion } from "motion/react"

export default function ScrollReveal() {
  return (
    <div className="h-[200vh] bg-gray-950 flex flex-col items-center justify-center text-white">
      <motion.h1
        className="text-4xl font-bold mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        I Fade In When Scrolled 👀
      </motion.h1>
    </div>
  )
}
⚡ Explanation:
initial → before visible
whileInView → when scrolled into view
viewport={{ once: true }} → animate only first time (not every scroll back)

💡 Common Scroll Use Cases
Effect	Technique
Fade / Slide in section	whileInView
Element linked to scroll progress	useScroll + useTransform
Parallax background	useScroll + different speeds
Scroll progress bar	useScroll with scaleX
🎯 Bonus Example – Scroll Progress Bar
import { motion, useScroll } from "motion/react"

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-2 bg-blue-500 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

👉 Ek thin blue bar banega upar, jo scroll ke saath fill hota jaayega — scroll indicator effect 😍
*/