import { getMembers, updateMember } from "../helper/helper";

function updateFav(addedItem) {
  return async function updateFavThunk(dispatch, getState) {
    const state = getState();
    const { localFavorite, loginUser } = getState();

    const getLatestUserInfo = async function () {
      const members = await getMembers();
      const loginUserLatest = members.find(
        (member) => member.account === loginUser.account
      );
      return loginUserLatest;
    };

    const updatedFavItems = async function () {
      const loginUserLatest = loginUser && (await getLatestUserInfo());

      let favItemsLatest = loginUser
        ? loginUserLatest?.favItem || []
        : [...localFavorite];

      const isExisted = favItemsLatest.some(
        (item) => item.productNo === addedItem.productNo
      );

      if (!isExisted) {
        favItemsLatest.push(addedItem);
      }
      if (isExisted) {
        favItemsLatest = favItemsLatest.filter(
          (item) => item.productNo !== addedItem.productNo
        );
      }

      return { favItemsLatest, loginUserLatest };
    };

    // start execute from here!
    const { favItemsLatest, loginUserLatest } = await updatedFavItems();

    if (loginUser) {
      // update DB
      updateMember({ ...loginUserLatest, favItem: favItemsLatest });
      // update state
      dispatch({
        type: "UPDATE_FAV",
        payload: {
          ...state,
          loginUser: { ...loginUserLatest, favItem: favItemsLatest },
        },
      });
    }

    if (!loginUser) {
      // update local
      localStorage.setItem("localFav", JSON.stringify(favItemsLatest));
      // update state
      dispatch({
        type: "UPDATE_FAV",
        payload: { ...state, localFavorite: favItemsLatest },
      });
    }
  };
}

export default updateFav;
