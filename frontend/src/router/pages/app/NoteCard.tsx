import { Note } from "../../../types/Note";
import { DateToString } from "../../../utils/Date";
import { Card } from "../../../components/input/Card";
import { TagChip } from "../../../components/input/TagChip";
import { key } from "../../../utils/Array";
import { ContentType } from "../../../types/Content";
import { Button } from "../../../components/input/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../../../services/AuthService";
import { updateNotes } from "../../../stores/NoteStore";
import { updateTags } from "../../../stores/TagsStore";

interface Props {
  data: {
    note: Note;
  };
}

export function NoteCard({ data: { note } }: Props) {
  const sortedContent = key((ele) => ele.type, note.contents);
  const images = sortedContent.get(ContentType.PICTURE);
  const text = sortedContent.get(ContentType.TEXT);

  function deleteNote() {
    AuthService.makeAuthorizedRequest("/api/note/" + note.id, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        updateNotes(true);
        updateTags(true);
      }
    });
  }

  return (
    <Card className="group">
      <div className="flex justify-between items-center relative">
        <h3 className="text-lg text-neutral-900">{note.title}</h3>
        <p className="text-neutral-600 text-sm group-hover:opacity-0">
          {DateToString(note.createdDate)}
        </p>
        <div className="flex items-center gap-2 absolute -right-1">
          <Button
            variant="PrimaryInverse"
            className="hidden group-hover:flex !p-3"
            onClick={deleteNote}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </div>
      {images && images?.length > 0 && (
        <div className="-mx-4 mb-0">
          <img className="min-h-[300px]" src={images[0].value} />
          {/* {images.length > 1 && (
            <div className="flex flex-row">
              {images.map((ele) => (
                <img className="h-16" src={ele.path} />
              ))}
            </div>
          )} */}
        </div>
      )}
      {text &&
        text?.length > 0 &&
        text?.map((text, i) => (
          <div key={"note" + note.id + "text" + i}>{text.value}</div>
        ))}
      <div className="flex flex-wrap gap-2">
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
