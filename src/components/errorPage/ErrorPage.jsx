import { useRouteError } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <Box textAlign="center" py={60} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        {error && error.status}
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page {error.statusText}
      </Text>
      <Text color={"gray.500"} mb={6}>
        <i>{error.error && error.error.message}</i>
      </Text>
    </Box>
  );
};

export default ErrorPage;
