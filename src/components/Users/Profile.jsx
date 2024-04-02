/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import editPenSvg from "../../assets/editPen.svg";
import defaultUser from "../../assets/default_user.png";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userFound } = useSelector(
    (state) => state?.users?.userAuth?.userInfo
  );

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    if (userFound) {
      setPersonalInfo({
        firstName: userFound?.firstName,
        lastName: userFound?.lastName,
        email: userFound?.email,
        gender: userFound?.gender,
      });
    }
  }, [userFound]);

  const { firstName, lastName, email, gender } = personalInfo;
  const { isAdmin, createdAt, pfp } = userFound;

  const personalInfoChangeHandler = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  console.log(personalInfo);

  return (
    <>
      <div className="sm:overflow-x-scroll scrollbar-hide">
        <div className="avatar-container w-full flex justify-between items-center  rounded-md p-4 sm:p-2">
          <div className="avatar-details flex items-center gap-6 sm:gap-4">
            <div className="avatar">
              <div className="w-24 sm:w-20 rounded-full shadow-lg">
                <img
                  src={pfp ? pfp : defaultUser}
                  alt="user"
                  className="w-full "
                />
              </div>
            </div>
            <div className="details font-[Poppins] space-y-2">
              <h1 className="text-2xl sm:text-xl font-bold">
                {firstName + " " + lastName}
              </h1>
              <p className="text-xs badge badge-ghost">
                {isAdmin ? "Admin" : "User"}
              </p>
              <p className="text-[10px] italic text-gray-500/65 tracking-wide">
                Joined at {createdAt.slice(0, 10)}
              </p>
            </div>
          </div>
          <div className="edit">
            <button className="border rounded-3xl sm:rounded-2xl sm:text-xs font-[Poppins] flex items-center gap-2 sm:gap-1 px-4 py-2 sm:px-2">
              Edit <img src={editPenSvg} alt="edit" className="w-4 sm:w-3" />
            </button>
          </div>
        </div>
        <hr className="my-4" />
        <div className="personal-info w-full p-4 sm:p-2">
          <h1 className="font-[Poppins] text-[#484848] text-xl font-semibold mb-6">
            Personal Information
          </h1>
          <div className="w-full">
            <div className="input-boxes flex sm:flex-col items-center justify-between gap-4 mb-2">
              <div className="space-y-1 flex-1 sm:w-full">
                <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  FirstName
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={personalInfoChangeHandler}
                />
              </div>
              <div className="space-y-1 flex-1 sm:w-full">
                <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  LastName
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={personalInfoChangeHandler}
                />
              </div>
            </div>
            <div className="input-boxes flex sm:flex-col items-start justify-between gap-4 mb-4">
              <div className="space-y-1 flex-1 sm:w-full">
                <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  type="email"
                  name="email"
                  value={email}
                  onChange={personalInfoChangeHandler}
                />
              </div>
              <div className="space-y-4 flex-1 sm:w-full">
                <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Gender
                </label>
                <div className="flex gap-4 items-center font-[Poppins]">
                  <div className="flex items-center gap-2">
                    <input
                      className="radio size-5"
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={personalInfoChangeHandler}
                    />
                    <label htmlFor="male" className="cursor-pointer text-sm">
                      Male
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      className="radio size-5"
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={personalInfoChangeHandler}
                    />
                    <label htmlFor="female" className="cursor-pointer text-sm">
                      Female
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      className="radio size-5"
                      type="radio"
                      id="other"
                      name="gender"
                      value="other"
                      checked={gender === "other"}
                      onChange={personalInfoChangeHandler}
                    />
                    <label htmlFor="other" className="cursor-pointer text-sm">
                      Other
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-[50%] py-2 bg-black text-white rounded-lg border-[1px] border-black">
              save
            </button>
          </div>

          <h1 className="font-[Poppins] text-[#484848] text-xl font-semibold my-6">
            Address Information
          </h1>
          <div className="w-full">
            <div className="input-boxes flex sm:flex-col items-center justify-between gap-4 mb-2">
              <div className="space-y-1 flex-1 sm:w-full">
                <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Address
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  type="text"
                  name="address"
                />
              </div>
              <div className="space-y-1 flex-1 sm:w-full">
                <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  City
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  type="text"
                  name="city"
                />
              </div>
            </div>
            <div className="input-boxes flex sm:flex-col items-center justify-between gap-4 mb-2">
              <div className="space-y-1 flex-1 sm:w-full">
                <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Province
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  type="text"
                  name="province"
                />
              </div>
              <div className="space-y-1 flex-1 sm:w-full">
                <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Postal Code
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  type="number"
                  name="postalCode"
                />
              </div>
            </div>
            <div className="input-boxes flex sm:flex-col items-center justify-between gap-4">
              <div className="space-y-1 flex-1 sm:w-full">
                <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Country
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  type="text"
                  name="country"
                />
              </div>
              <div className="space-y-1 flex-1 sm:w-full">
                <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Phone Number
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  type="number"
                  name="phoneNumber"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
