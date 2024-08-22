'use client';

import ChatForm from '@/components/ChatForm';
import { Button } from '@/components/ui/button';
import { useEnterSubmit } from '@/lib/use-enter-submit';
import { useChat } from 'ai/react';
import { ArrowRight, Loader2, ToyBrick, User } from 'lucide-react';
import { useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
export default function Page() {
    const { formRef, onKeyDown } = useEnterSubmit();
    const inputRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === '/') {
            if (
              e.target &&
              ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).nodeName)
            ) {
              return;
            }
            e.preventDefault();
            e.stopPropagation();
            if (inputRef?.current) {
              inputRef.current.focus();
            }
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [inputRef]);
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop , error, reload} =
    useChat({
      api: "/api/chat",
    // body: {
    //   chatId,
    // },
    // initialMessages: data || [],
      keepLastMessageOnError: true,
    });


  return (
    <div className=" h-screen">
        
    <div className="pb-[200px] pt-4 md:pt-10">
    <div className="relative mx-auto max-w-2xl px-4 ">
      {messages.map(message => (
        <div key={message.id} className={`flex  p-4 rounded-lg ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          {/* {message.role === 'user' ? <User/> : <ToyBrick/>} */}
          <div className={`p-3 max-w-[80%] rounded-3xl ${message.role === 'user' ? 'bg-blue-500 text-white ' : 'bg-gray-200'}`}>
          {message.content}
          </div>
        </div>
      ))}

      {isLoading && (
        <div>
          <Loader2 className='h-10 w-10 text-blue-500 animate-spin'/>
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}
      
      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}
</div>
</div>
<div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
<div className="mx-auto sm:max-w-2xl sm:px-4">
<div className="px-4 flex justify-center flex-col py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4 bg-white">
      <form ref={formRef} onSubmit={handleSubmit} >
        {/* <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          className='w-sceen bg-black mx-2 text-white'
        /> */}
     
     <div className="relative flex flex-col w-full overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border">
            <TextareaAutosize
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
              tabIndex={0}
              onKeyDown={onKeyDown}
              placeholder="Send a message."
              className="min-h-[60px] w-full resize-none bg-transparent pl-4 pr-16 py-[1.3rem] focus-within:outline-none sm:text-sm"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              rows={1}
            //   {...form.register('message')}
            />
            <div className="absolute right-0 top-4 sm:right-4">
              <Button
                type="submit"
                size="icon"
                // disabled={form.watch('message') === ''}
              >
                <ArrowRight className="w-5 h-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </form>
        </div>
      </div>
     </div>
    </div>
  );
}