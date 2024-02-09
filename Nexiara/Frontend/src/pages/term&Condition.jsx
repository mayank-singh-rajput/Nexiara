import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultData = {
  accept: false,
};

function TermCondition() {
  const [formData, setFormData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const pageRoute = useNavigate();

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, accept: e.target.checked });
  };

  const formSubmit = async (e, accepted) => {
    e.preventDefault();
    if (accepted) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        pageRoute("/question");
        toast.success("Accepted Term & Condition");
      }, 1000);
    } else {
      toast.warning("You declined the terms and conditions.");
    }
  };

  const handleDecline = () => {
    toast.warning("You declined the terms and conditions.");
    pageRoute("/login");
  };

  return (
    <div className="bg-[#121418] flex justify-center items-center h-screen">
      <div className="w-[80%] sm:w-[400px] pl-0 ml-0 h-[400px] sm:pl-0 sm:ml-9 mt-20 relative">
        <form className="flex flex-col gap-y-3">
          <div
            className="border-4 m-2 p-4"
            style={{ maxHeight: "300px", overflowY: "scroll" }}
          >
            <p className="text-[#fff]">
              By accessing and using this quiz play website, you agree to the
              following terms and conditions. You must be of legal age to enter
              into contracts or have parental consent if under 18. When creating
              a user account, you are responsible for maintaining its
              confidentiality. All content on this website, including text,
              graphics, and software, is owned by the website owner and
              protected by copyright laws. You may use the content for personal,
              non-commercial purposes only. Prohibited activities include
              unauthorized access, interference with website functionality, and
              uploading harmful content. Any content you submit becomes the
              property of the website owner. The website is provided "as is,"
              and the owner does not guarantee its accuracy or reliability. The
              owner is not liable for any damages arising from website use. You
              agree to indemnify the owner against any claims resulting from
              your use of the website. These terms are governed by
              Jurisdiction laws. By using the website, you accept these terms
              and any updates that may occur.
              <br />
              <br />
              <span className="bg-[#c7c7aa] text-green-800 font-bold">All answers are compulsory. and you have only 30 sec to answers one question</span>
            </p>
          </div>

          <div className="ml-5">
            <label className="text-[#fff]">
              <input
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={formData.accept}
              />
              <span className="ml-2">I accept the terms and conditions</span>
            </label>
          </div>
          {formData.accept ? (
            <button
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)",
              }}
              className="w-[100%] sm:w-[80%] h-[50px] font-bold text-[#121418] tracking-wide text-[17px] relative mb-5  ml-5"
              type="submit"
              onClick={(e) => formSubmit(e, true)}
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
                className="text-[#fff]"
              >
                Proceed
              </p>
            </button>
          ) : (
            <button
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)",
              }}
              className="w-[100%] sm:w-[80%] h-[50px] font-bold text-[#121418] tracking-wide text-[17px] relative mb-5  ml-5"
              type="button"
              onClick={handleDecline}
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
                className="text-[#fff]"
              >
                Decline
              </p>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default TermCondition;
