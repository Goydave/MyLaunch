"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can be set to the user's actual values.
const defaultValues: Partial<ProfileFormValues> = {
  name: "David Paulino",
  email: "david.paulino@example.com"
}

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme.",
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>


export default function SettingsPage() {
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
        theme: "light",
    }
  })

  function onProfileSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated!",
      description: "Your new profile information has been saved.",
    })
  }

  function onAppearanceSubmit(data: AppearanceFormValues) {
    if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle("dark", data.theme === "dark");
    }
    toast({
      title: "Theme updated!",
      description: `Switched to ${data.theme} mode.`,
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account settings and app preferences.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                This is how others will see you on the site.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                        <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} className="max-w-xs" />
                            </FormControl>
                            <FormDescription>
                                This is the name that will be displayed on your profile.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                             <FormControl>
                                <Input placeholder="Your email" {...field} className="max-w-xs" />
                            </FormControl>
                            <FormDescription>
                                Your email address is used for account-related notifications.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit">Update profile</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                Customize the appearance of the app.
                </CardDescription>
            </CardHeader>
            <CardContent>
               <Form {...appearanceForm}>
                    <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-8">
                         <FormField
                            control={appearanceForm.control}
                            name="theme"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel>Theme</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="light" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Light
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="dark" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Dark
                                        </FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                        <Button type="submit">Update preferences</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
