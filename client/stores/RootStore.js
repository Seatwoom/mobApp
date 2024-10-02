import { types } from "mobx-state-tree";
import TaskStore from "./TaskStore";
const RootStore = types.model("RootStore", {
  taskStore: TaskStore,
});

export default RootStore;
