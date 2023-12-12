import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateUserProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    await updateProfile(user, {
      displayName: name,
      photoURL: image,
    });
    e.target.reset();
    navigate("/");
    toast.success("Update Successfull");
  };

  return (
    <div className="container mx-auto ">
      <form onSubmit={handleUpdate} className="my-8 w-3/4 mx-auto my">
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="text-base font-medium text-gray-900"
              >
                Name
              </label>
            </div>
            <div className="mt-2">
              <input
                defaultValue={user?.displayName}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
              ></input>
            </div>
          </div>
          <div>
            <label
              htmlFor="image"
              className="text-base font-medium text-gray-900"
            >
              Image Url
            </label>
            <div className="mt-2">
              <input
                defaultValue={user?.photoURL}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="url"
                name="image"
                id="image"
                placeholder="Image URL"
              ></input>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserProfile;
