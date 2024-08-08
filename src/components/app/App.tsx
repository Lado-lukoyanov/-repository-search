import { Provider } from "react-redux";
import { store } from "../../store/store";

import { MainScreen } from "../ui/main-screen/main-screen";

export const App = () => {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};
