import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const Quote = () => {
    const { quote, isFetchingQuote, getQuote } = useAuthStore();
    useEffect(() => {
        getQuote()
        // console.log(quote)
    }, [getQuote,quote])  
    return (
      <div className="mx-auto flex flex-col items-center justify-center">
        {isFetchingQuote ? (
          <div>Loading...</div>
        ) : quote === "zenquotes.io" ? (
          <div>No quote found</div>
                ) : (
          <>
            <div className="text-4xl font-mono font-bold text-center mt-20">Quote of The Day</div>
            <div className="text-xl text-primary text-center font-mono mt-4">{`"${quote}"`}</div>
          </>
        )}
      </div>
        );
};

export default Quote;

