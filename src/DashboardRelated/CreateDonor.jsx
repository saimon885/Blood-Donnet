import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../AuthProvider/UseAuth";

const CreateDonor = () => {
  const { user } = UseAuth();
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const handleCreateDonor = () => {};
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(handleCreateDonor)}>
          <fieldset className="fieldset">
            <div className="flex gap-5">
              <label className="label">
                <input
                  type="radio"
                  value="document"
                  className="radio"
                  {...register("percelType")}
                  defaultChecked
                />
                Document
              </label>
              <label className="label">
                <input
                  type="radio"
                  value="non-document"
                  {...register("percelType")}
                  className="radio"
                />
                Non-Document
              </label>
            </div>
            {/* Percel Name and weight */}
            <div className="grid grid-cols-2 gap-5 items-center w-full">
              <div>
                <fieldset>
                  <label className="label">Percel Name</label>
                  <input
                    type="text"
                    {...register("percelName")}
                    className="input w-full"
                    placeholder="Percel Name"
                  />
                </fieldset>
                <h3 className="font-bold my-3 text-2xl">Sender Details</h3>
                <fieldset>
                  <label className="label">Sender Name</label>
                  <input
                    type="text"
                    {...register("senderName")}
                    defaultValue={user?.displayName}
                    className="input w-full"
                    placeholder="Sender Name"
                  />
                </fieldset>
                <fieldset>
                  <label className="label">Sender Email</label>
                  <input
                    type="email"
                    {...register("senderEmail")}
                    defaultValue={user?.email}
                    className="input w-full"
                    placeholder="Sender Email"
                  />
                </fieldset>
                <fieldset>
                  <label className="label">Address</label>
                  <input
                    type="text"
                    {...register("senderAddress")}
                    className="input w-full"
                    placeholder="Address"
                  />
                </fieldset>
                <fieldset>
                  <label className="label">Sender Phone Number</label>
                  <input
                    type="number"
                    {...register("senderNumber")}
                    className="input w-full"
                    placeholder="Sender Phone Number"
                  />
                </fieldset>
                {/* ekhono onek kicu bojar ace */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Sender Region</legend>
                  <select
                    {...register("senderRegion")}
                    defaultValue="Pick a Region"
                    className="select w-full"
                  >
                    <option disabled={true}>Pick a Region</option>
                    {Regions.map((r, i) => (
                      <option value={r} key={i}>
                        {r}
                      </option>
                    ))}
                  </select>
                </fieldset>
                {/* Sender District */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Sender District</legend>
                  <select
                    {...register("senderDistrict")}
                    defaultValue="Pick a District"
                    className="select w-full"
                  >
                    <option disabled={true}>Pick a District</option>
                    {districtByRegion(senderRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </fieldset>
                {/* ekhono onek kicu bojar ace */}
                <fieldset>
                  <label className="label">Pickup Instraction</label>
                  <textarea
                    {...register("pickupInstraction")}
                    className="input w-full"
                    placeholder="Pickup Instraction"
                  ></textarea>
                </fieldset>
              </div>
              {/* reciver */}
              <div>
                <fieldset>
                  <label className="label">Percel Weight</label>
                  <input
                    type="number"
                    {...register("percelWeight")}
                    className="input w-full"
                    placeholder="Percel weight"
                  />
                </fieldset>
                <h3 className="font-bold my-3 text-2xl">Reciver Details</h3>
                <fieldset>
                  <label className="label">Reciver Name</label>
                  <input
                    type="text"
                    {...register("ReciverName")}
                    className="input w-full"
                    placeholder="Reciver Name"
                  />
                </fieldset>
                <fieldset>
                  <label className="label">Reciver Email</label>
                  <input
                    type="email"
                    {...register("reciverEmail")}
                    className="input w-full"
                    placeholder="Reciver Email"
                  />
                </fieldset>
                <fieldset>
                  <label className="label">Reciver Address</label>
                  <input
                    type="text"
                    {...register("reciverAddress")}
                    className="input w-full"
                    placeholder="Address"
                  />
                </fieldset>
                <fieldset>
                  <label className="label">Reciver Phone Number</label>
                  <input
                    type="number"
                    {...register("reciverNumber")}
                    className="input w-full"
                    placeholder="Reciver Phone Number"
                  />
                </fieldset>
                {/* onek kicu bojar ace */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Reciver Region</legend>
                  <select
                    {...register("reciverRegion")}
                    defaultValue="Pick a Region"
                    className="select w-full"
                  >
                    <option disabled={true}>Pick a Region</option>
                    {Regions.map((r, i) => (
                      <option value={r} key={i}>
                        {r}
                      </option>
                    ))}
                  </select>
                </fieldset>
                {/* district */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Reciver District</legend>
                  <select
                    {...register("reciverDistrict")}
                    defaultValue="Pick a District"
                    className="select w-full"
                  >
                    <option disabled={true}>Pick a District</option>
                    {districtByRegion(reciverRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </fieldset>

                <fieldset>
                  <label className="label">Delevery Instraction</label>
                  <textarea
                    {...register("deleveryInstraction")}
                    className="input w-full"
                    placeholder="Delevery Instraction"
                  ></textarea>
                </fieldset>
              </div>
            </div>
          </fieldset>
          <input
            className="btn btn-neutral mt-4"
            type="submit"
            value="Send percel"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateDonor;
