import { FiCopy } from "react-icons/fi";
import useUsersPage from "../hooks/users-page.hook";
import { generateColorFromPhone } from "../utils/colors";
import { HiDotsHorizontal } from "react-icons/hi";

function UsersPage() {
  const usersHook = useUsersPage();

  return (
    <main className="container mx-auto p-4">
      {usersHook.users && (
        <div className="overflow-x-auto ">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Contact</th>
                <th>ID</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usersHook.users
                .slice(usersHook.page * 6, usersHook.page * 6 + 6)
                .map((user, i) => (
                  <tr key={i}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div
                            className="mask mask-squircle h-12 w-12 font-semibold relative"
                            style={{
                              backgroundColor: generateColorFromPhone(
                                user.phone
                              ).hex,
                            }}
                          >
                            <p className="absolute inset-0 flex items-center justify-center text-xl text-base-content/50">
                              {user.name.at(0)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-ghost badge-sm">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </span>
                      <br />

                      {user.phone && (
                        <span
                          className="badge  badge-sm font-semibold p-2"
                          style={{
                            backgroundColor: generateColorFromPhone(user.phone)
                              .hex,
                          }}
                        >
                          <a href={`tel:${user.phone}`}>{user.phone}</a>
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(user._id);
                        }}
                        className="text-xs opacity-50 btn btn-ghost btn-sm"
                      >
                        <FiCopy size={10} />
                        {user._id.slice(0, 6)}...
                      </button>
                    </td>

                    <td>
                      <span
                        className={
                          "badge" + (user.role === "admin" ? " badge-info" : "")
                        }
                      >
                        {user.role}
                      </span>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs rounded-full">
                        <HiDotsHorizontal size={16} />
                      </button>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
          <br className="h-10" />
          <div className="flex justify-center w-full h-20">
            <div className="join grid grid-cols-2 w-60">
              <button
                className="join-item btn btn-sm btn-outline"
                disabled={usersHook.page === 0}
                onClick={() => {
                  usersHook.setPage(usersHook.page - 1);
                }}
              >
                Previous
              </button>
              <button
                className="join-item btn btn-sm  btn-outline"
                disabled={usersHook.page * 6 + 6 >= usersHook.users.length}
                onClick={() => {
                  usersHook.setPage(usersHook.page + 1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default UsersPage;
