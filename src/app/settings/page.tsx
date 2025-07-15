
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
import { useUser } from "@/hooks/use-user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"
import { auth } from "@/lib/firebase"
import { signOut, updateProfile, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"
import { useRouter } from "next/navigation"

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

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export default function SettingsPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, loading } = useUser();

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  })

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
  })

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && user) {
      appearanceForm.setValue("theme", theme);
      profileForm.reset({ name: user.name || '', email: user.email || '' });
    }
  }, [theme, user, isMounted, appearanceForm, profileForm]);

  async function onProfileSubmit(data: ProfileFormValues) {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
        await updateProfile(currentUser, { displayName: data.name });
        // Updating email requires re-authentication, so we'll skip it for now
        // to keep this example simpler.
        toast({
            title: "Profile updated!",
            description: "Your new profile information has been saved.",
        });
    } catch(error: any) {
        toast({
            title: "Error updating profile",
            description: error.message,
            variant: "destructive"
        })
    }
  }
  
  async function handleAvatarChange() {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    
    // In a real app, this would open a file picker and upload to storage.
    // Here, we'll just cycle through a few placeholder images.
    const newAvatarUrl = `https://i.pravatar.cc/150?u=${Date.now()}`;
    try {
        await updateProfile(currentUser, { photoURL: newAvatarUrl });
        toast({
            title: "Avatar updated!",
            description: "Your new profile picture has been saved.",
        });
    } catch(error: any) {
         toast({
            title: "Error updating avatar",
            description: error.message,
            variant: "destructive"
        })
    }
  }

  function onAppearanceSubmit(data: AppearanceFormValues) {
    setTheme(data.theme)
    toast({
      title: "Theme updated!",
      description: `Theme set to ${data.theme}.`,
    })
  }

  async function handleLogout() {
     try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function handleDeleteAccount() {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    // NOTE: Deleting a user is a sensitive operation that requires recent
    // authentication. In a real app, you would prompt the user to re-enter
    // their password before proceeding.
    try {
        await deleteUser(currentUser);
        toast({
            title: "Account Deleted",
            description: "Your account has been permanently deleted.",
            variant: "destructive"
        });
        router.push('/');
    } catch(error: any) {
        console.error("Account deletion error:", error);
        toast({
            title: "Error deleting account",
            description: "This is a sensitive operation and requires recent login. Please log out and log back in to delete your account.",
            variant: "destructive"
        })
    }
  }
  
  if (!isMounted || loading || !user) {
    return null; // Or a loading skeleton
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
                           <div className="flex items-center gap-4">
                              <div className="relative">
                                <Avatar className="h-20 w-20">
                                  <AvatarImage src={user.avatar ?? undefined} alt="User avatar" />
                                  <AvatarFallback>{user.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
                                </Avatar>
                                <Button 
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="absolute bottom-0 right-0 rounded-full"
                                  onClick={handleAvatarChange}
                                >
                                  <Camera className="h-4 w-4"/>
                                  <span className="sr-only">Change profile picture</span>
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground">Click the camera to change your avatar.</p>
                            </div>

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
                                  <Input placeholder="Your email" {...field} className="max-w-xs" disabled />
                              </FormControl>
                              <FormDescription>
                                  Your email address cannot be changed.
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
