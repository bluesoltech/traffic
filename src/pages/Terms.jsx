import React from "react";

const Terms = () => {
  return (
    <div className="md:m-8 md:p-4">
      <div className="justify-center text-center my-[20px]">
        <h1 className="text-[30px] font-bold bg-gradient-to-r from-[#111827] to-[#111827] text-transparent bg-clip-text">
          Terms and Conditions
        </h1>
      </div>
      <div className="md:w-[60%] mx-auto justify-center justify-items-center p-6 rounded-sm shadow-2xl">
        <ul className="">
          <li className="m-2">
            1. The competition emphasizes traffic awareness.
          </li>
          <li className="m-2">
            2. Plagiarism in slogan creation leads to disqualification.
          </li>
          <li className="m-2">3. Participants of all ages are welcome.</li>
          <li className="m-2">
            4. Accepted languages: Hindi, English, Gujarati.
          </li>
          <li className="m-2">
            5. Slogans: max 25 words, submit two variants.
          </li>
          <li className="m-2">
            6. Design original posters, physical or digital.
          </li>
          <li className="m-2">
            7. Deadline approaching: 15th Feb'24; late submissions not accepted.
          </li>
          <li className="m-2">
            8. Any discrepancies in provided details result in termination from
            the competition.
          </li>
        </ul>
      </div>
    </div>
  );
};
// - The competition emphasizes traffic awareness.
// - Plagiarism in slogan creation leads to disqualification.
// - Participants of all ages are welcome.
// - Accepted languages: Hindi, English, Gujarati.
// - Slogans: max 25 words, submit two variants.
// - Design original posters, physical or digital.
// - Deadline approaching; late submissions not accepted.
// - Any discrepancies in provided details result in termination from the competition.
export default Terms;
