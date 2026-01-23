"use client"

import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="top-right"
      duration={5000}
      closeButton={true}
      richColors={true}
      toastOptions={{
        style: {
          background: "rgb(30 41 59)", // slate-800
          border: "1px solid rgb(51 65 85)", // slate-700
          color: "white",
        },
        classNames: {
          toast: "group toast group-[.toaster]:shadow-lg",
          title: "group-[.toast]:text-white group-[.toast]:font-semibold",
          description: "group-[.toast]:text-slate-300",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-slate-700 group-[.toast]:text-slate-300",
          closeButton: "group-[.toast]:bg-slate-700 group-[.toast]:text-slate-300 group-[.toast]:hover:bg-slate-600",
          success: "group-[.toaster]:!bg-green-900/90 group-[.toaster]:!border-green-700 group-[.toaster]:!text-green-100",
          error: "group-[.toaster]:!bg-red-900/90 group-[.toaster]:!border-red-700 group-[.toaster]:!text-red-100",
          warning: "group-[.toaster]:!bg-yellow-900/90 group-[.toaster]:!border-yellow-700 group-[.toaster]:!text-yellow-100",
          info: "group-[.toaster]:!bg-blue-900/90 group-[.toaster]:!border-blue-700 group-[.toaster]:!text-blue-100",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
