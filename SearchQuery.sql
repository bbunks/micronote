USE micronote;

SELECT *
FROM micronote.note n
    JOIN micronote.note_content nc on n.id = nc.note_id
    JOIN micronote.note_tag nt on n.id = nt.note_id
#     JOIN micronote.tag t on t.id = nt.tag_id
WHERE nt.tag_id in (10, 11)
