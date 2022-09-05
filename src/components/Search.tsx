import {
  HStack,
  IconButton,
  Input,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MovieResult } from "moviedb-promise/dist/request-types";
import { useEffect, useState } from "react";
import { searchMovie } from "src/api/tmdbApi";
import { FiPlusCircle } from "react-icons/fi";
import Image from "next/image";

const vStackProps = {
  p: "4",
  w: "100%",
  maxW: { base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" },
  borderColor: "gray.100",
  borderWidth: "2px",
  borderRadius: "lg",
  alignItems: "stretch",
  divider: <StackDivider />,
};

const buttonProps = {
  icon: <FiPlusCircle />,
  isRound: true,
  "aria-label": "check",
};

const Search = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MovieResult[]>([]);

  useEffect(() => {
    if (keyword.length === 0) return;

    const fetchSearchResults = async () => {
      const response = await searchMovie(keyword);
      setSearchResults(response.results as MovieResult[]);
    };
    fetchSearchResults();
  }, [keyword]);

  return (
    <>
      <Input
        id="field"
        color="secondary"
        variant="flushed"
        placeholder="映画のタイトルを入力してください"
        onChange={(e) => setKeyword(e.target.value)}
      />
      {keyword.length > 0 && searchResults.length > 0 && (
        <VStack {...vStackProps}>
          {searchResults.map((result) => (
            <HStack key={result.id}>
              <IconButton {...buttonProps} />
              <Text>{result.title}</Text>
            </HStack>
          ))}
        </VStack>
      )}
    </>
  );
};

export default Search;
