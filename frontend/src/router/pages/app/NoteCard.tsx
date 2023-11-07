import { Note } from "../../../types/Note";
import { DateToString } from "../../../utils/Date";
import { Card } from "../../../components/input/Card";
import { TagChip } from "../../../components/input/TagChip";

interface Props {
  data: {
    note: Note;
  };
}

export function NoteCard({ data: { note } }: Props) {
  const images = note.content.attachments?.filter(
    (ele) => ele.type === "image"
  );

  return (
    <Card>
      {images && images?.length > 0 && (
        <div className="-m-4 mb-0">
          <img className="min-h-[100px]" src={images[0].path} />
          {/* {images.length > 1 && (
            <div className="flex flex-row">
              {images.map((ele) => (
                <img className="h-16" src={ele.path} />
              ))}
            </div>
          )} */}
        </div>
      )}
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-neutral-900">{note.title}</h3>
        <p className="text-neutral-600 text-sm">{DateToString(note.date)}</p>
      </div>
      {note.content.text && <div>{note.content.text}</div>}
      <div>
        {note.tags.map((ele) => (
          <TagChip
            label={ele.label}
            color={ele.color}
            key={note.id + "tag" + ele.id}
          />
        ))}
      </div>
    </Card>
  );
}
