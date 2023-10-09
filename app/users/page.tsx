import getUsers from "../actions/getUsers";
import UsersDataTable from "./UsersDataTable";
import { columns } from "./Columns";

export default async function Home() {
  const users = await getUsers();
  console.log(users);
  return (
    <div className="w-full h-full sm:p-10 p-4">
      <UsersDataTable data={users} columns={columns} />
    </div>
  );
}
