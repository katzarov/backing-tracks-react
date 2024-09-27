import { useEffect, useReducer } from "react";

// users of this hook must implement this interface for the items in their list
export interface IGenericCheckboxItem {
  id: number;
  selected: boolean;
}

type ICheckboxListLogicActionTypes<TToggle, TReset> =
  | { type: "toggle"; payload: TToggle }
  | { type: "reset"; payload: TReset };

interface ICheckboxListLogicState<T extends IGenericCheckboxItem> {
  items: T[];
  itemsEqualToInitialState: boolean;
}

const initializer = <T extends IGenericCheckboxItem>(
  initializerArg: T[]
): ICheckboxListLogicState<T> => {
  return {
    items: initializerArg,
    itemsEqualToInitialState: true,
  };
};

/**
 * Creates a new item object (=> new reference) ONLY for the toggled item.
 * Running time: O(n), n = items.
 *
 */
const toggleItem = <TItem extends IGenericCheckboxItem>(
  items: TItem[],
  toggledItemId: number
) =>
  items.map((item) =>
    item.id === toggledItemId ? { ...item, selected: !item.selected } : item
  );

/**
 * Assumes items don't change order or length.
 * Running time: O(n), n = initialItems or n = nextItems, doesn't matter.
 *
 */
const isItemsEqualToInitial = <TItem extends IGenericCheckboxItem>(
  initialItems: TItem[],
  nextItems: TItem[]
) => {
  if (initialItems.length !== nextItems.length) {
    console.warn("Checkbox logic assumption violated - length items changed!");
    return false;
  }

  for (let i = 0; i < initialItems.length; i++) {
    if (initialItems[i].id !== nextItems[i].id) {
      console.warn(
        "Checkbox logic assumption violated - order of checkbox items changed!"
      );
      return false;
    }

    if (initialItems[i].selected !== nextItems[i].selected) {
      return false;
    }
  }
  return true;
};

const getReducer = <TItem extends IGenericCheckboxItem>(
  initializerArg: TItem[]
) => {
  // we want initializerArg, which is the initial/defalt state when the hook is mounted to be in the closure of the reducer function,
  // as it is used to check if any new state is the same as the original one.
  return (
    state: ICheckboxListLogicState<TItem>,
    action: ICheckboxListLogicActionTypes<IGenericCheckboxItem["id"], TItem[]>
  ): ICheckboxListLogicState<TItem> => {
    switch (action.type) {
      case "toggle": {
        const nextItems = toggleItem(state.items, action.payload);
        const nextItemsEqualToInitialState = isItemsEqualToInitial(
          initializerArg,
          nextItems
        );
        return {
          ...state,
          items: nextItems,
          itemsEqualToInitialState: nextItemsEqualToInitialState,
        };
      }
      case "reset": {
        return initializer(action.payload);
      }
      default:
        throw new Error("unsupported reducer action");
    }
  };
};

// TODO: when this is used in some settings modal for example,
// it will likely need to support iterating over keys in a object as well, and not only items in a array.
export const useCheckboxListLogic = <TItem extends IGenericCheckboxItem>(
  initializerArg: TItem[]
) => {
  const reducer = getReducer(initializerArg);
  const [state, dispatch] = useReducer<typeof reducer, TItem[]>(
    reducer,
    initializerArg,
    initializer
  );

  useEffect(() => {
    // TODO: ideally, we should skip this at initial mount.
    dispatch({ type: "reset", payload: initializerArg });
  }, [initializerArg]);

  const handleToggle = (id: IGenericCheckboxItem["id"]) => {
    dispatch({ type: "toggle", payload: id });
  };

  return {
    ...state,
    handleToggle,
  };
};
