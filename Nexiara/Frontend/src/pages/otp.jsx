import React, { useEffect, useState, useRef } from "react";
import { verifyOTP, sendOTP, validUser } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultData = {
  otp: Array(6).fill(""), // Initialize the OTP array with 6 empty strings
};

function Otp() {
  const [formData, setFormData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [otpGenerated, setOtpGenerated] = useState(false);
  const pageRoute = useNavigate();

  // Refs for each OTP input field
  const inputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));

  const handleSingleCharChange = (e, index) => {
    const updatedOtp = [...formData.otp];
    if (
      e.target.value === "" &&
      e.nativeEvent.inputType === "deleteContentBackward" &&
      index > 0
    ) {
      updatedOtp[index] = "";
      setFormData({ ...formData, otp: updatedOtp });
      inputRefs.current[index - 1].current.focus();
    } else {
      updatedOtp[index] = e.target.value;
      setFormData({ ...formData, otp: updatedOtp });

      if (index < 5 && e.target.value !== "") {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

  const generateOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data } = await sendOTP();
    if (data) {
      setOtpGenerated(true);
      toast.success("Successfully sent OTP on Email!");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error("Failed to send OTP. Please try again!");
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (formData.otp.join("").length === 6) {
      setIsLoading(true);
      const { data } = await verifyOTP({ otp: formData.otp.join("") });
      if (data?.token) {
        localStorage.setItem("userToken", data.token);
        toast.success("Successfully Verified!");
        setIsLoading(false);
        pageRoute("/term-condition");
      } else {
        setIsLoading(false);
        toast.error("Invalid OTP!");
        setFormData({ ...formData, otp: Array(6).fill("") });
      }
    } else {
      toast.warning("Please provide a valid OTP!");
    }
  };

  useEffect(() => {
    const isValid = async () => {
      const data = await validUser();
      if (data?.user) {
        pageRoute("/term-condition");
      }
    };
    isValid();
  }, [pageRoute]);

  return (
    <div className="bg-[#121418] w-screen h-screen flex justify-center items-center">
      <div className="w-[90%] sm:w-[400px] pl-0 ml-0 h-[400px] sm:pl-0 sm:ml-9 mt-20 relative">
        <button
          style={{
            background:
              "linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)",
          }}
          className="w-[100%] sm:w-[80%] h-[50px] font-bold text-[#121418] tracking-wide text-[17px] relative mb-5  ml-5"
          onClick={generateOTP}
          hidden={otpGenerated}
        >
          {isLoading ? (
            <div
              style={{
                position: "absolute",
                top: "-53px",
                left: "27%",
                display: "block",
              }}
            >
              <lottie-player
                src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
                background="transparent"
                speed="1"
                style={{ width: "200px", height: "160px" }}
                loop
                autoplay
              ></lottie-player>
            </div>
          ) : (
            <p className="test-[#fff]">Generate OTP</p>
          )}
        </button>
        {otpGenerated && (
          <form
            className="flex flex-col gap-y-3 mt-[12%]"
            onSubmit={formSubmit}
          >
            <div className="flex justify-between mb-[12%]">
              {formData.otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs.current[index]}
                  className="w-[15%] sm:w-[12%] bg-[#222222] h-[50px] pl-3 text-[#ffff] text-center"
                  onChange={(e) => handleSingleCharChange(e, index)}
                  name={`otp-${index}`}
                  type="text"
                  placeholder="X"
                  value={digit}
                  maxLength={1}
                  required
                />
              ))}
            </div>
            <button
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)",
              }}
              className="w-[100%] sm:w-[80%] h-[50px] font-bold text-[#121418] tracking-wide text-[17px] relative mb-5 ml-5"
              type="submit"
            >
              <div
                style={{ display: isLoading ? "" : "none" }}
                className="absolute -top-[53px] left-[27%] sm:-top-[53px] sm:left-[56px]"
              >
                <lottie-player
                  src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
                  background="transparent"
                  speed="1"
                  style={{ width: "200px", height: "160px" }}
                  loop
                  autoplay
                ></lottie-player>
              </div>
              <p
                style={{ display: isLoading ? "none" : "block" }}
                className="test-[#fff]"
              >
                Verify OTP
              </p>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Otp;
