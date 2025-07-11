
"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { useTheme } from "@/hooks/use-theme"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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

const defaultValues: Partial<ProfileFormValues> = {
  name: "David Paulino",
  email: "david.paulino@example.com"
}

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>


export default function SettingsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme()

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
  })

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      appearanceForm.setValue("theme", theme);
    }
  }, [theme, isMounted, appearanceForm]);


  function onProfileSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated!",
      description: "Your new profile information has been saved.",
    })
  }

  function onAppearanceSubmit(data: AppearanceFormValues) {
    setTheme(data.theme)
    toast({
      title: "Theme updated!",
      description: `Theme set to ${data.theme}.`,
    })
  }

  function handleLogout() {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  }

  function handleDeleteAccount() {
    toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive"
    });
  }
  
  if (!isMounted) {
    return null;
  }

  return (
    <>
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
                                  <FormDescription>
                                      Select the theme for the application.
                                  </FormDescription>
                                  <FormControl>
                                      <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="grid max-w-md grid-cols-3 gap-8 pt-2"
                                      >
                                      <FormItem>
                                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                              <FormControl>
                                                  <RadioGroupItem value="light" className="sr-only" />
                                              </FormControl>
                                              <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                                                  <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                                      <div className="h-2 w-16 rounded-lg bg-[#ecedef]" />
                                                      <div className="h-2 w-12 rounded-lg bg-[#ecedef]" />
                                                  </div>
                                                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                      <div className="h-2 w-20 rounded-lg bg-[#ecedef]" />
                                                  </div>
                                                  </div>
                                              </div>
                                              <span className="block w-full p-2 text-center font-normal">Light</span>
                                          </FormLabel>
                                      </FormItem>
                                      <FormItem>
                                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                              <FormControl>
                                                  <RadioGroupItem value="dark" className="sr-only" />
                                              </FormControl>
                                              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                                              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                      <div className="h-2 w-16 rounded-lg bg-slate-400" />
                                                      <div className="h-2 w-12 rounded-lg bg-slate-400" />
                                                  </div>
                                                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                      <div className="h-2 w-20 rounded-lg bg-slate-400" />
                                                  </div>
                                              </div>
                                              </div>
                                              <span className="block w-full p-2 text-center font-normal">Dark</span>
                                          </FormLabel>
                                      </FormItem>
                                      <FormItem>
                                          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                              <FormControl>
                                                  <RadioGroupItem value="system" className="sr-only" />
                                              </FormControl>
                                              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                                                  <div className="flex rounded-sm shadow-sm">
                                                      <div className="w-1/2 space-y-2 rounded-l-sm bg-[#ecedef] p-2">
                                                          <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                                              <div className="h-2 w-10 rounded-lg bg-[#ecedef]" />
                                                              <div className="h-2 w-8 rounded-lg bg-[#ecedef]" />
                                                          </div>
                                                      </div>
                                                      <div className="w-1/2 space-y-2 rounded-r-sm bg-slate-950 p-2">
                                                          <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                              <div className="h-2 w-10 rounded-lg bg-slate-400" />
                                                              <div className="h-2 w-8 rounded-lg bg-slate-400" />
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <span className="block w-full p-2 text-center font-normal">System</span>
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
          <Card>
              <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                  <CardDescription>Manage your account preferences and actions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                          <p className="font-medium">Log Out</p>
                          <p className="text-sm text-muted-foreground">Ends your current session.</p>
                      </div>
                      <Button variant="outline" onClick={handleLogout}>Log Out</Button>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-destructive/50 rounded-lg">
                      <div>
                          <p className="font-medium text-destructive">Delete Account</p>
                          <p className="text-sm text-muted-foreground">Permanently delete your account and all data.</p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              account and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAccount} className={buttonVariants({ variant: "destructive" })}>
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                  </div>
              </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
