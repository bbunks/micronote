import { useNotes } from "../../../stores/NoteStore";
import { LoadingIndicator } from "../../../components/Loading";
import { reverseArray } from "../../../utils/Array";

export function ReportPage() {
  const { state: notes, isLoading } = useNotes();

  //If notes state is load, return a spiner rather than the empty page
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-16">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="px-4">
      <h1 className="text-white text-4xl pb-4">Note Report</h1>
      {notes.length === 0 ? (
        <p className="text-center m-12 text-primary-lighter">
          What are you thinking? Write it down.
        </p>
      ) : (
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Note ID
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Tag Count
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Content Count
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Created Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {reverseArray(notes).map((note) => (
              <tr key={note.id + "report"}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {note.id}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {note.title}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {note.tags.length}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {note.contents.length}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {note.createdDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
