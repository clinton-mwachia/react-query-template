import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ title, href }) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      textAlign={"center"}
      _hover={{
        bg: "gray.400",
      }}
      p={1}
    >
      <Stack align={"center"} spacing={2}>
        <Box mt={2}>
          <Heading size="md" noOfLines={1}>
            @{title}
          </Heading>
        </Box>
        <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
          <Link to={`${href}`}>Learn more</Link>
        </Button>
      </Stack>
    </Box>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default Card;
