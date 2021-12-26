export const verifyEmail = (
  subject: string,
  name: string,
  url: string
) => `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
            <div class="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
                <h3 class="text-2xl">Thanks for signing up to Blooms Hair</h3>
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-green-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                    </svg>
                </div>
                <p>Hello, ${name}</p>
                <p>We're happy you're here. Let's get your email address verified:</p>
                <div class="mt-4">
                    <button class="px-2 py-2 text-white bg-blue-600 rounded" type="button" value="button" onclick="${url}">Click to Verify Email</button>
                    <p class="mt-4 text-sm">If you’re having trouble clicking the "Verify Email Address" button, copy
                        and
                        paste
                        the URL below
                        into your web browser:
                        <a href="${url}" class="text-blue-600 underline">${url}</a>
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>`;

export const resetPasswordRequestEmail = (
  subject: string,
  name: string,
  url: string
) => `<html lang='en'>
<head>
  <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
<div class="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
            <div class="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
                <h3 class="text-2xl">Reset your password</h3>
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-green-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                    </svg>
                </div>
                <p>Hello, ${name}</p>
                <div class="mt-4">
                    <button class="px-2 py-2 text-blue-200 bg-blue-600 rounded" type="button" value="button" onclick="${url}">Click to reset your password</button>
                    <p class="mt-4 text-sm">If you’re having trouble clicking the "Reset Password" button, copy
                        and
                        paste
                        the URL below
                        into your web browser:
                        <a href="${url}" class="text-blue-600 underline">${url}</a>
                    </p>
                </div>
            </div>
        </div>
</body>
</html></h1>`;

export const resetPasswordVerificationEmail = (
  subject: string,
  name: string
) => `<html lang='en'>
<head>
  <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
<div class="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
            <div class="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
                <h3 class="text-2xl">Reset your password</h3>
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-green-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                    </svg>
                </div>
                <p>Hello, ${name}</p>
                <div class="mt-4">
                    <p class="mt-4 text-sm">Password reset successfully.</p>
                </div>
            </div>
        </div>
</body>
</html></h1>`;
