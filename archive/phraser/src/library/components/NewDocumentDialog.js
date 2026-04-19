import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { fetchExamsForSubjectWithId } from "../../utils/libraryRepository";
import libraryHelpers from "../libraryHelpers";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import { open as openNewSubjectDialog } from "../../store/addSubjectDialogSlice";
import { open } from "../../store/newExamTypeDialogSlice";

export const NewDocumentDialog = ({
  initiallySelectedSubjectId = "",
  handleSaveNewDocument,
  fixedDocumentType,
  ...props
}) => {
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState(libraryHelpers.documentTypes.phraser);
  const [selectedSubjectId, setSelectedSubjectId] = React.useState(
    initiallySelectedSubjectId
  );
  const [selectedSubjectExams, setSelectedSubjectExams] = React.useState([]);
  const [selectedExamId, setSelectedExamId] = React.useState("");

  const subjects = useSelector((state) => state.subjects.list);

  const dispatch = useDispatch();

  const handleSave = () => {
    handleSaveNewDocument(title, selectedExamId, type);
    close();
  };

  const close = () => {
    props.onClose();
    setTitle("");
  };

  React.useEffect(() => {
    async function fetchExams() {
      const exams = await fetchExamsForSubjectWithId(selectedSubjectId);
      setSelectedSubjectExams(exams);
    }
    fetchExams();
  }, [selectedSubjectId]);

  React.useEffect(() => {
    setType(fixedDocumentType);
  }, [fixedDocumentType]);

  const handleSelectSubjectItem = (value) => {
    if (value === addSubjectSelectItemValue) {
      dispatch(
        openNewSubjectDialog({
          newSubjectAddedHandler: (newSubject) => {
            setSelectedSubjectId(newSubject.id);
          },
        })
      );
    } else {
      setSelectedSubjectId(value);
    }
  };

  const handleSelectExamItem = (value) => {
    if (value === addExamSelectItemValue) {
      dispatch(
        open({
          subjectId: selectedSubjectId,
          newExamAddedHandler: (newExam) => {
            setSelectedSubjectExams([...selectedSubjectExams, newExam]);
            setSelectedExamId(newExam.id);
          },
        })
      );
    } else {
      setSelectedExamId(value);
    }
  };

  const inputsCount = !!fixedDocumentType ? 3 : 4;
  const addSubjectSelectItemValue = "addSubject";
  const addExamSelectItemValue = "addExam";

  return (
    <>
      <Dialog {...props} onClose={close}>
        <DialogTitle>New document</DialogTitle>
        <DialogContent>
          <Grid
            container
            columnSpacing={2}
            direction="row"
            justifyContent="stretch"
            alignItems="stretch"
          >
            <Grid item xs={12 / inputsCount}>
              <TextField
                autoFocus
                margin="dense"
                label="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>
            {!!!fixedDocumentType && (
              <Grid
                item
                xs={12 / inputsCount}
                alignItems="stretch"
                display="flex"
              >
                <ToggleButtonGroup
                  color="primary"
                  value={type}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setType(e.target.value);
                  }}
                  aria-label="Platform"
                  sx={{ width: "100%", pb: 0.5, pt: 1, fontSize: 16 }}
                >
                  <ToggleButton
                    sx={{ width: "65%", fontSize: 16 }}
                    value={libraryHelpers.documentTypes.questionGenerator}
                  >
                    {
                      libraryHelpers.documentTitles[
                        libraryHelpers.documentTypes.questionGenerator
                      ]
                    }
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "35%", fontSize: 16 }}
                    value={libraryHelpers.documentTypes.phraser}
                  >
                    {
                      libraryHelpers.documentTitles[
                        libraryHelpers.documentTypes.phraser
                      ]
                    }
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            )}
            <Grid item xs={12 / inputsCount}>
              <FormControl margin="dense" sx={{ width: "100%" }}>
                <InputLabel id="subject-select-label">Subject</InputLabel>
                <Select
                  labelId="subject-select-label"
                  id="subject-select"
                  value={selectedSubjectId}
                  label="Subject"
                  onChange={(e) => {
                    handleSelectSubjectItem(e.target.value);
                  }}
                >
                  <MenuItem disabled value="">
                    Subject
                  </MenuItem>
                  {subjects.map((subject) => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.title}
                    </MenuItem>
                  ))}
                  <MenuItem value={addSubjectSelectItemValue}>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <ListItemText primary="Add" />
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12 / inputsCount}>
              <FormControl margin="dense" sx={{ width: "100%" }}>
                <InputLabel id="exam-type-label">Exam type</InputLabel>
                <Select
                  labelId="exam-type-label"
                  id="exam-type-select"
                  value={selectedExamId}
                  label="Exam type"
                  onChange={(e) => {
                    handleSelectExamItem(e.target.value);
                  }}
                  disabled={!!!selectedSubjectId}
                >
                  <MenuItem disabled value="">
                    Exam type
                  </MenuItem>
                  {selectedSubjectExams.map((exam) => (
                    <MenuItem key={exam.id} value={exam.id}>
                      {exam.title}
                    </MenuItem>
                  ))}
                  <MenuItem value={addExamSelectItemValue}>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <ListItemText primary="Add" />
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button
            disabled={!!!title || !!!type || !!!selectedExamId}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
