import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  addCategory,
  addSource,
  removeCategory,
  removeSource,
} from "../../features/favorites/favoritesSlice";
import { ISource } from "../../models/news";
import { RootState } from "../../store";
import Button from "../UI/Button";
import { IconFavorite } from "../UI/Icons";

interface SourceDetailsProps {
  displaySource: ISource;
}

const SourceDetails = ({ displaySource }: SourceDetailsProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  return (
    <div className="relative">
      <div className="font-bold text-xl w-fit m-auto mb-6">
        {displaySource.name}
      </div>
      <div className="flex items-center">
        <div className="capitalize mr-2">
          Category : {displaySource?.category}
        </div>
        {" ("}
        <button
          className="flex items-center text-teal underline"
          onClick={() => {
            if (favorites.category.includes(displaySource.category)) {
              dispatch(removeCategory(displaySource.category));
              return;
            }
            dispatch(addCategory(displaySource.category));
          }}
        >
          {favorites.category.includes(displaySource.category) ? (
            <span>Remove this category from Favorites</span>
          ) : (
            <>
              <span>Add this category to Favorites</span>
              <IconFavorite className="w-4 h-4" />
            </>
          )}
        </button>
        {")"}
      </div>
      <div className="capitalize">Country : {displaySource?.country}</div>
      <div className="my-6">{displaySource?.description}</div>
      {displaySource?.url ? (
        <Link
          target="_blank"
          className="underline mt-6 text-teal"
          to={displaySource?.url}
        >
          Go to {displaySource.name}'s website
        </Link>
      ) : null}
      {favorites.sources.includes(displaySource) ? (
        <Button
          variant="secondary"
          className="flex items-center mt-4"
          onClick={() => dispatch(removeSource(displaySource))}
        >
          <span>Remove {displaySource.name} from Favorites</span>
        </Button>
      ) : (
        <Button
          className="flex items-center mt-4"
          onClick={() => dispatch(addSource(displaySource))}
        >
          <IconFavorite className="w-6 h-6 mr-2" />{" "}
          <span>Add {displaySource.name} to Favorites</span>
        </Button>
      )}
    </div>
  );
};

export default SourceDetails;
