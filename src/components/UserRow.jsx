import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const UserRow = ({ user }) => {
  return (
    <tr className="border-b">
      <td className="py-2">{user.name}</td>
      <td className="py-2">{user.email}</td>
      <td className="py-2">{user.role}</td>
      <td className="py-2">
        <span className={`px-3 py-1 rounded-full text-white ${user.status === "Active" ? "bg-green-500" : "bg-red-500"}`}>
          {user.status}
        </span>
      </td>
      <td className="py-2 flex space-x-3">
        <button className="text-blue-500"><PencilIcon className="w-5 h-5" /></button>
        <button className="text-red-500"><TrashIcon className="w-5 h-5" /></button>
      </td>
    </tr>
  );
};

export default UserRow;
