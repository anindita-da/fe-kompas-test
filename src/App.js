import React from "react";
import "./App.css";
import { getData } from "./Api";
import { groupByDate, keyHumanize } from "./Util";
import { ListJajan, Header } from "./Header";
import { CustomizedDialogs } from "./Dialog";

function App() {
  const [state, setState] = React.useState({
    data: [],
  });
  const [isOpen, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen((prev) => !prev);
  React.useEffect(() => {
    getData().then((data) => {
      if (Array.isArray(data.items)) {
        setState((prev) => ({
          ...prev,
          data: data.items,
        }));
      }
    });
  }, [setState]);
  const groupedDataByDate = groupByDate(state.data);
  console.log({
    keys: Object.keys(groupedDataByDate).map(keyHumanize).sort(),
  });
  const handleSubmit = (data) =>
    setState((prev) => ({ ...prev, data: [data, ...prev.data] }));
  return (
    <>
      <Header items={state.data} handleClickOpen={handleClickOpen} />
      <ListJajan data={state.data} />
      <CustomizedDialogs
        open={isOpen}
        handleClickOpen={handleClickOpen}
        handleClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default App;
