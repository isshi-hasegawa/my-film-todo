import { Box, Button, VStack } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";

const providers = [
  {
    name: "google",
    Icon: BsGoogle,
  },
];

const SignIn = () => {
  return (
    <Box>
      <VStack>
        {providers.map(({ name, Icon }) => (
          <Button
            key={name}
            leftIcon={<Icon />}
            onClick={() => signIn(name)}
            textTransform="uppercase"
            w="100%"
          >
            {name} でログイン
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default SignIn;
