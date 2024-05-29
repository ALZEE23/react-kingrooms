import Navbar from "../components/Navbar";
import cuy from "../assets/HeaderImage 1 (1).svg";
import skill1 from "../assets/Skills Card Icon (1).svg";
import skill from "../assets/Skills Card Icon.svg";
import logo from "../assets/Empty Div.svg";
import uhuy from "../assets/Vector.svg";
import p from "../assets/p.svg";
import m from "../assets/m.svg";
import facebook from "../assets/facebook.svg";
import pinterest from "../assets/pininterest.svg";
import shape from "../assets/Shape.svg";
import linked from "../assets/Linked In.svg";
export default function Index() {
  return (
    <>
      <Navbar />
      <section id="home" className="pt-28 sm:pt-40 sm:mb-16">
        <div className="grid sm:grid-cols-2">
          <div className="px-6 space-y-2 sm:px-32">
            <p className="text-lg -mb-3"> A Website for booking a room</p>
            <h1 className="text-7xl font-semibold">KingRoom</h1>
            <div className="pt-1 pr-6">
              <p className="">
                This is a website for you to book a certain room in SMKN 1
                CIOMAS. Want to book a room? log in now!
              </p>
            </div>

            <div className="pt-7">
              <button
                className="text-xl px-4 py-2 rounded-lg text-white "
                style={{
                  background:
                    "linear-gradient(93.26deg, #BC4141 10.4%, #42408E 101.06%),linear-gradient(0deg, #E9DEFF, #E9DEFF)",
                }}
              >
                Log In
              </button>
            </div>
          </div>
          <div className="sm:w-96 sm:h-60 w-72 mx-auto mt-10 sm:mt-0">
            <img src={cuy} alt="" className="sm:scale-110" />
          </div>
        </div>
      </section>
      <section id="about" className=" sm:mb-40 sm:mt-0 sm:pt-36 pt-20">
        <div className="grid sm:grid-cols-2 px-7 sm:px-32 space-y-16 sm:space-y-0">
          <div
            className="grid space-y-14 px-5 py-6 sm:space-y-20 sm:mr-20 rounded-2xl"
            style={{
              background:
                " linear-gradient(93.26deg, #BC4141 10.4%, #42408E 101.06%),linear-gradient(0deg, #E9DEFF, #E9DEFF)",
            }}
          >
            <h1 className="text-3xl text-white">Why?</h1>
            <p className="text-lg sm:text-base text-white">
              This website is specially made from student, for student. We
              notices that it is hard for the student to book a room at SMKN 1
              CIOMAS. and so, Kingroom is here to help you
            </p>
          </div>
          <div
            className="grid space-y-14 px-5 py-6 sm:space-y-20 sm:ml-16 rounded-2xl"
            style={{
              background:
                " linear-gradient(93.26deg, #BC4141 10.4%, #42408E 101.06%),linear-gradient(0deg, #E9DEFF, #E9DEFF)",
            }}
          >
            <h1 className="text-3xl text-white">What’s so good about it?</h1>
            <p className="text-lg sm:text-base text-white">
              With this, you can book any room that’s available to book even
              more easier. Not to mention, you can do it at all times. That’s
              why, kingroom is the most effective choice for you.
            </p>
          </div>
        </div>
      </section>
      <section id="how" className="mb-10 sm:px-24 sm:mb-40 mt-0 pt-24 ">
        <div className="grid sm:grid-cols-2 px-5 space-y-10 sm:space-y-0">
          <div className="grid space-y-5 sm:mx-8 px-5">
            <img
              src={skill}
              alt=""
              className="flex mx-auto scale-75 sm:scale-100"
            />
            <h1 className="text-3xl mx-auto">Log In</h1>
            <p className="mx-auto text-center sm:text-xl">
              Or perhaps, create an account. This way, you’re one step closer to
              book a room with this website.
            </p>
          </div>
          <div className="grid space-y-5 sm:mx-8 px-5">
            <img
              src={skill1}
              alt=""
              className="flex mx-auto scale-75 sm:scale-100"
            />
            <h1 className="text-3xl mx-auto">Choose</h1>
            <p className="mx-auto text-center sm:text-xl">
              Choose a room that you want, whatever it is, or whenever it is.
            </p>
          </div>
        </div>
      </section>
      <section
        id="footer"
        className="sm:px-24 pb-6 pt-6"
        style={{
          background: "linear-gradient(180deg, #2F2D82 25.1%, #BC4141 100%)",
        }}
      >
        <div className="grid grid-cols-4 gap-y-4 sm:gap-y-0 px-5">
          <div className="col-span-4 sm:col-span-1">
            <div className="flex items-center">
              <img src={logo} alt="" className="scale-150 flex" />
              <h1 className="text-3xl font-semibold  text-white">KingRoom</h1>
            </div>
          </div>
          <div className="block space-y-2">
            <h1 className="sm:text-lg text-white">Dashboard</h1>
            <h1 className="sm:text-lg  text-white">About Us</h1>
            <h1 className="sm:text-lg  text-white">Tutorial</h1>
            <h1 className="sm:text-lg  text-white">Log In</h1>
          </div>
          <div className="block space-y-2 col-span-2 sm:col-span-1">
            <h1 className="sm:text-lg text-center sm:text-left text-white">
              Contact Us
            </h1>
            <div className="flex space-x-1">
              <img src={uhuy} alt="" />
              <h1 className="sm:text-lg  text-white">SMKN 1 CIOMAS</h1>
            </div>
            <div className="flex space-x-1">
              <img src={p} alt="" />
              <h1 className="sm:text-lg  text-white">083819279366</h1>
            </div>
            <div className="flex space-x-1">
              <img src={m} alt="" />
              <h1 className="sm:text-lg  text-white">mamah@gmail.com</h1>
            </div>
          </div>
          <div className="block space-y-2">
            <h1 className="sm:text-lg  text-white">SocialMedia</h1>
            <div className="flex sm:space-x-3 space-x-1">
              <img src={facebook} alt="" />
              <img src={pinterest} alt="" />
              <img src={shape} alt="" />
              <img src={linked} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
