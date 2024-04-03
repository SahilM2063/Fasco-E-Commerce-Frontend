/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import editPenSvg from "../../assets/editPen.svg";
import defaultUser from "../../assets/default_user.png";
import { useSelector, useDispatch } from "react-redux";
import {
  getSingleUserProfile,
  updateUserAddressAction,
  updateUserProfileAction,
  userDeleteAction,
  userSelfDeleteAction,
} from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });
  const [addressInfo, setAddressInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
  });

  const { user, message } = useSelector((state) => state?.users?.user);
  const { loading, error, isUpdated } = useSelector((state) => state?.users);

  useEffect(() => {
    dispatch(getSingleUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setPersonalInfo({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        gender: user?.gender,
      });
      setSelectedImage(user?.pfp ? user.pfp : defaultUser);
      setAddressInfo({
        address: user?.shippingAddress?.address || "",
        city: user?.shippingAddress?.city || "",
        state: user?.shippingAddress?.state || "",
        country: user?.shippingAddress?.country || "",
        postalCode: user?.shippingAddress?.postalCode || "",
        phoneNumber: user?.shippingAddress?.phoneNumber || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (isUpdated) {
      setPersonalInfo({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        gender: user?.gender,
      });
      setAddressInfo({
        address: user?.shippingAddress?.address || "",
        city: user?.shippingAddress?.city || "",
        state: user?.shippingAddress?.state || "",
        country: user?.shippingAddress?.country || "",
        postalCode: user?.shippingAddress?.postalCode || "",
        phoneNumber: user?.shippingAddress?.phoneNumber || "",
      });
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [isUpdated, error]);

  const { firstName, lastName, email, gender } = personalInfo;
  const { address, city, state, country, postalCode, phoneNumber } =
    addressInfo;

  const [selectedImage, setSelectedImage] = useState(
    user?.pfp ? user.pfp : defaultUser
  );
  const [updatedImage, setUpdatedImage] = useState(user?.pfp ? user.pfp : "");
  const [fileErrs, setFileErrs] = useState([]);

  const personalInfoChangeHandler = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const addressInfoChangeHandler = (e) => {
    setAddressInfo({
      ...addressInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePersonalProfileSubmit = (e) => {
    e.preventDefault();
    if (fileErrs.length > 0) {
      return toast.error(fileErrs[0]);
    }
    console.log(personalInfo, updatedImage);
    dispatch(
      updateUserProfileAction({
        ...personalInfo,
        id: user?._id,
        pfp: updatedImage,
      })
    );
  };

  const handleAddressInfoSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...addressInfo,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });
    dispatch(
      updateUserAddressAction({
        ...addressInfo,
        firstName: user?.firstName,
        lastName: user?.lastName,
        id: user?._id,
      })
    );
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const errs = [];
      const file = e.target.files[0];
      if (file?.size > 1000000) {
        errs.push(`${file.name} is too large!`);
      }
      if (!file?.type?.startsWith("image/")) {
        errs.push(`${file.name} is not an image!`);
      }
      setFileErrs(errs);
      const fileURL = URL.createObjectURL(file);
      setSelectedImage(fileURL);
      setUpdatedImage(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("imageInput").click();
  };

  const handleAccountDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      dispatch(userSelfDeleteAction(user?._id));
    }
    return;
  };

  return (
    <>
      <div className="sm:overflow-x-scroll scrollbar-hide">
        <div className="avatar-container w-full flex justify-between items-start rounded-md p-4 sm:p-2">
          <div className="avatar-details flex items-center gap-6 sm:gap-4">
            <div className="avatar">
              <div className="w-24 sm:w-20 rounded-full shadow-lg">
                <img
                  src={selectedImage}
                  alt="user"
                  className="w-full hover:bg-opacity-60"
                  onClick={triggerFileInput}
                  style={{ cursor: "pointer" }}
                />
                <input
                  type="file"
                  id="imageInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="details font-[Poppins] space-y-2">
              <h1 className="text-2xl sm:text-xl font-bold">
                {firstName + " " + lastName}
              </h1>
              <p className="text-xs badge badge-ghost">
                {user?.isAdmin ? "Admin" : "User"}
              </p>
              <p className="text-[10px] italic text-gray-500/65 tracking-wide">
                Joined at {user?.createdAt && user.createdAt.slice(0, 10)}
              </p>
            </div>
          </div>
          {user?.isAdmin ? (
            <Link
              to="/admin/dashboard"
              className="px-3 py-2 bg-black text-white rounded-lg border-[1px] border-black"
            >
              Admin Dashboard
            </Link>
          ) : (
            <div
              onClick={handleAccountDelete}
              className="py-1.5 px-3 rounded-md bg-red-500 text-white border-[1px] border-red-500 cursor-pointer"
            >
              Delete Account
            </div>
          )}
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
            <button
              onClick={handlePersonalProfileSubmit}
              className="w-[calc(50%-8px)] py-2 bg-black text-white rounded-lg border-[1px] border-black"
            >
              {loading ? "Saving..." : "Save"}
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
                  value={address}
                  onChange={addressInfoChangeHandler}
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
                  value={city}
                  onChange={addressInfoChangeHandler}
                />
              </div>
            </div>
            <div className="input-boxes flex sm:flex-col items-center justify-between gap-4 mb-2">
              <div className="space-y-1 flex-1 sm:w-full">
                <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  State
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  type="text"
                  name="state"
                  value={state}
                  onChange={addressInfoChangeHandler}
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
                  value={postalCode}
                  onChange={addressInfoChangeHandler}
                />
              </div>
            </div>
            <div className="input-boxes flex sm:flex-col items-center justify-between gap-4 mb-4">
              <div className="space-y-1 flex-1 sm:w-full">
                <label className="text-sm text-gray-500/95 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Country
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  type="text"
                  name="country"
                  value={country}
                  onChange={addressInfoChangeHandler}
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
                  value={phoneNumber}
                  onChange={addressInfoChangeHandler}
                />
              </div>
            </div>
            <button
              onClick={handleAddressInfoSubmit}
              className="w-[calc(50%-8px)] py-2 bg-black text-white rounded-lg border-[1px] border-black"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
