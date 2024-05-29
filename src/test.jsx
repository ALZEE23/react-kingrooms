import Sidebar from "./components/Sidebar";

export default function Test() {
  return (
    <div className="flex h-full">
      <section className="flex flex-grow">
        <div className="flex px-3 sm:px-5"></div>
        <div className="overflow-x-auto shadow-xl sm:rounded-lg mx-5 my-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Time
                </th>
                <th scope="col" className="px-6 py-3">
                  End Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3">
                  Room
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>{/* Tambahkan data dinamis di sini */}</tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
