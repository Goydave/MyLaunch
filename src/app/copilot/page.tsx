// src/app/copilot/page.tsx
"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Send, Sparkles, User } from "lucide-react";
import { chat, type Message } from "@/ai/flows/chat";
import { useUser } from "@/hooks/use-user";

const formSchema = z.object({
  prompt: z.string().min(1, "Message cannot be empty."),
});

type FormValues = z.infer<typeof formSchema>;

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: values.prompt },
    ];
    setMessages(newMessages);
    form.reset();

    try {
      const result = await chat(newMessages);
      if (typeof result === "string" && result) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: result },
        ]);
      } else {
         setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: "I'm sorry, I couldn't get a response. Please try again." },
        ]);
      }
    } catch (e) {
      console.error(e);
      setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: "An error occurred. Please try again later." },
        ]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full flex-1">
      <header className="p-4 border-b">
         <h1 className="text-lg font-semibold md:text-2xl">AI Co-founder</h1>
         <p className="text-muted-foreground text-sm">
           Your partner in brainstorming, validation, and strategy.
         </p>
      </header>

      <main className="flex-1 overflow-hidden p-4">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6 max-w-4xl mx-auto">
          {messages.length === 0 && (
              <div className="text-center text-muted-foreground pt-16">
                  <Sparkles className="mx-auto h-12 w-12 mb-4" />
                  <h2 className="text-xl font-semibold">Start the Conversation</h2>
                  <p className="mt-2">What's on your mind? Ask for startup names, feature ideas, or a product description!</p>
              </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-4 ${message.role === "user" ? "justify-end" : ""}`}>
                {message.role === "assistant" && (
                    <Avatar className="h-9 w-9 border">
                        <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground">
                            <Sparkles className="h-5 w-5"/>
                        </div>
                    </Avatar>
                )}
                 <div className={`rounded-lg p-3 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                 </div>
                 {message.role === "user" && (
                    <Avatar className="h-9 w-9 border">
                        <AvatarImage src={user?.avatar ?? undefined} />
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                )}
            </div>
          ))}
           {isLoading && (
               <div className="flex items-start gap-4">
                   <Avatar className="h-9 w-9 border">
                        <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground">
                            <Sparkles className="h-5 w-5"/>
                        </div>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-muted flex items-center space-x-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                    </div>
               </div>
           )}
          </div>
        </ScrollArea>
      </main>

      <footer className="p-4 border-t">
        <Card className="max-w-4xl mx-auto">
            <CardContent className="p-2">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center gap-2">
                    <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem className="flex-grow">
                        <FormControl>
                            <Input
                            placeholder="e.g., 'Suggest some names for a fitness app'"
                            {...field}
                            className="h-10 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            autoComplete="off"
                            />
                        </FormControl>
                        <FormMessage className="pl-2" />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" disabled={isLoading} size="icon">
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
                </Form>
            </CardContent>
        </Card>
      </footer>
    </div>
  );
}
