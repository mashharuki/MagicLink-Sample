
import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useUser } from "../../context/UserContext"
import { useWeb3 } from "../../context/Web3Context"

/**
 * SignMessage Component
 * @returns 
 */
const SignMessage = () => {
  // Use the Web3Context to get the current instance of web3
  const { web3 } = useWeb3()
  // Use the UserContext to get the current logged-in user
  const { user } = useUser()

  // Initialize state for message and signature
  const [message, setMessage] = useState("")
  const [signature, setSignature] = useState("")

  /**
   * handleInput method
   * @param e 
   * @returns 
   */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  /**
   * handleSignMessage method
   */
  const handleSignMessage = async () => {
    if (user && web3) {
      try {
        // Sign the message using the connected wallet
        const signedMessage = await web3.eth.accounts.sign(message, user);
        // Set the signature state with the signed message
        setSignature(signedMessage.signature)
      } catch (error) {
        // Log any errors that occur during the signing process
        console.error("handleSignMessage:", error)
      }
    }
  }

  // Render the component
  return (
    <HStack 
        justifyContent="flex-start" 
        alignItems="flex-start"
    >
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding="10px"
      >
        <VStack>
          {/* Input field for the message to be signed */}
          <Input
            placeholder="Set Message"
            maxLength={20}
            onChange={handleInput}
            w="300px"
          />
          {/* Button to trigger the signMessage function */}
          <Button 
            onClick={handleSignMessage} 
            isDisabled={!message}
          >
            Sign Message
          </Button>
        </VStack>
        {/* Display the signature if available */}
        {signature && <Text>{`Signature: ${signature}`}</Text>}
      </Box>
    </HStack>
  )
}

export default SignMessage;