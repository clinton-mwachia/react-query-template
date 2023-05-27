import { Input, List, ListItem } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Search = ({ searchText, setSearchText, suggestions }) => {
  return (
    <>
      <Input
        type="text"
        name="search"
        placeholder="search users..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <List bg={"green.200"}>
        {searchText.length > 0
          ? suggestions.map((item, index) => (
              <ListItem key={index}>{item.name}</ListItem>
            ))
          : null}
      </List>
    </>
  );
};

Search.propTypes = {
  searchText: PropTypes.string.isRequired,
  suggestions: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  setSearchText: PropTypes.func,
};

export default Search;
