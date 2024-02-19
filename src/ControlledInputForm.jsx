import { useState } from 'react';
import { Center, Heading, Flex, Button, Input, Text } from '@chakra-ui/react';

// ✅ Ensure this utility function is defined
function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const ControlledInputForm = () => {
  const [quotes, setQuotes] = useState([
    {
      // Note the curly braces here to denote an object
      quote: 'My biggest fear is that people will attribute fake quotes to me and millions of morons on the internet will believe it.',
      author: 'Albert Einstein',
    },
  ]);

  // Function to capitalize the first letter of each word (used for author names)
  function capitalizeWords(string) {
    return string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  //----currentQuote and quoteError States
  const [currentQuote, setCurrentQuote] = useState('');
  const [quoteError, setQuoteError] = useState('');

  //----author State and authorError State
  const [author, setAuthor] = useState('');
  const [authorError, setAuthorError] = useState(''); // Author error state initialization

  const handleChangeCurrentQuote = (event) => {
    const inputValue = event.target.value;
    // Directly use the user's input for real-time feedback without altering it
    setCurrentQuote(inputValue); // ✅ This is the right location

    const trimmedValue = inputValue.trim();
    const regex = /^[A-Za-z\s]+$/;

    if (trimmedValue === '') {
      setQuoteError('Please enter a quote');
    } else if (!regex.test(trimmedValue)) {
      setQuoteError('Please enter only letters and spaces');
    } else {
      setQuoteError('');
      // Do not set currentQuote here again since we're already updating it above
    }
  };

  // Handling and validating author input
  const handleChangeAuthor = (event) => {
    const inputValue = event.target.value;
    // Directly use the user's input for real-time feedback without altering it
    setAuthor(inputValue); // Store the input as-is, preserving spaces and casing

    // Validation logic remains unchanged
    const trimmedValue = inputValue.trim();
    const regex = /^[A-Za-z\s.,]+$/;

    if (trimmedValue === '') {
      setAuthorError("Please enter the author's name");
    } else if (!regex.test(trimmedValue)) {
      setAuthorError('Please enter a valid author name');
    } else {
      setAuthorError('');
      // Do not apply capitalization here; it will be done before submission
    }
  };

  // a lot of issues with typing: spaces, uppercase has bee fixed by bringing the capitalization  inside the handleSubmit function
  const handleSubmit = (event) => {
    event.preventDefault();

    // Final formatting applied here before submission
    const finalQuote = capitalizeFirstLetter(currentQuote.trim());
    // Apply capitalization to the author's name here
    const finalAuthor = capitalizeWords(author.trim());

    if (finalQuote !== '' && finalAuthor !== '' && quoteError === '' && authorError === '') {
      const newQuote = { quote: finalQuote, author: finalAuthor };
      setQuotes((prevQuotes) => [...prevQuotes, newQuote]);

      // Reset form fields and error messages
      setCurrentQuote('');
      setAuthor('');
      setQuoteError('');
      setAuthorError('');
    } else {
      // Update error messages if validation fails
      if (currentQuote === '') setQuoteError('Please enter a quote');
      if (author === '') setAuthorError("Please enter the author's name");
    }
  };

  const quotesList = quotes.map((item, index) => (
    <Flex key={index} flexDir="column" alignItems="left" width="700px" mb="2rem">
      <Flex flexDir="column" className="quote" textAlign="left">
        <Text fontSize="1.4rem" fontStyle="italic" fontWeight="500">
          {item.quote}
        </Text>
        <Text fontSize="1.4rem">{item.author}</Text>
      </Flex>
    </Flex>
  ));

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex flexDir="column" alignItems="center" width="700px">
          <Flex flexDir="column" textAlign="left" width="700px">
            <Text fontSize="large" fontWeight="700" mb="1rem">
              Quote:
            </Text>
            <Input type="text" value={currentQuote} placeholder="Write here the quote" onChange={handleChangeCurrentQuote} mb="0.5rem" />
            {quoteError && (
              <Text style={{ color: 'red' }} mb="1rem">
                {quoteError}
              </Text>
            )}
            <Text fontSize="large" fontWeight="700" mb="1rem">
              Author:
            </Text>
            <Input type="text" value={author} placeholder="Write here the author" onChange={handleChangeAuthor} mb="0.5rem" />
            {authorError && (
              <Text style={{ color: 'red' }} mb="3rem">
                {authorError}
              </Text>
            )}{' '}
            {/* Display author validation error message */}
          </Flex>

          <Button type="submit" width="200px" mb="5rem">
            Add quote
          </Button>
          <Heading mb="1rem">Quotes:</Heading>
        </Flex>
      </form>

      {quotesList}
    </>
  );
};

//-------NOTES:

//---REGULAR EXPRESSIONS:

/* In the code I used:   const regex = /^[A-Za-z\s]+$/;

/.../: The forward slashes at the beginning and end are delimiters that mark the start and end of the regex pattern.

^: This asserts the start of the string. It means that the pattern must match at the beginning of the string being tested.

[A-Za-z]: This is a character class that matches any single character from the range A to Z (uppercase letters) and a to z (lowercase letters). 
It does not match digits or special characters.

\s: This matches any whitespace character (spaces, tabs, etc.).

+: This quantifier matches one or more of the preceding element. In this case, it applies to both letters [A-Za-z] and whitespace characters \s,
meaning the pattern can match one or more letters and spaces in any combination.

$: This asserts the end of the string. It means that the pattern must match at the very end of the string being tested.

Putting it all together, ^[A-Za-z\s]+$ matches a string if it starts with a letter or whitespace, contains only letters (both uppercase and lowercase) 
and/or spaces, and ends with a letter or whitespace. There can be one or more characters, but no digits or special symbols are allowed. */

// ISSUES:

// no uppercase letter at the beginning of the quote or names
/* It seems there might be a misunderstanding in the implementation. Applying the capitalizeWords function directly within handleChangeCurrentQuote as
 it currently stands could interfere with the user's ability to type normally, especially if they're in the middle of typing a sentence and the input 
 is being capitalized in real-time. This could lead to a jarring user experience.

Instead, you might want to apply such transformations at a different stage, such as right before submission, or when displaying the quotes, to preserve
the user's input as they type it. If capitalizing the first letter of each word is crucial for your application's requirements, consider when and how
to apply this to enhance the user experience rather than hinder it.

Here's a quick conceptual adjustment to apply capitalization more appropriately:*/
