"use client"

import React, { useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from './ui/button';
import { ArrowRight, PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useEnterSubmit } from '@/lib/use-enter-submit';
import type { ChatInputs } from "@/lib/chat-schema";


const ChatForm = (handleSubmit:any,value:any,onChange:any,disabled:any) => {
    const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);


  const form = useForm<ChatInputs>();

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
  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
    <div className="mx-auto sm:max-w-2xl sm:px-4">
      <div className="px-4 flex justify-center flex-col py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4 bg-white">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className="relative flex flex-col w-full overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border">
            <TextareaAutosize
            //   value={value}
            //   onChange={onChange}
              disabled={disabled}
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
                disabled={form.watch('message') === ''}
              >
                <ArrowRight className="w-5 h-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </form>
        <Button
          variant="outline"
          size="lg"
          className="p-4 mt-4 rounded-full bg-background"
          onClick={e => {
            e.preventDefault();
            window.location.reload();
          }}
        >
          <PlusIcon className="w-5 h-5" />
          <span>New Chat</span>
        </Button>
      </div>
    </div>
  </div>
  )
}

export default ChatForm