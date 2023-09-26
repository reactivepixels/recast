import clsx from "clsx";
import { Fragment, forwardRef } from "react";

export function CodeWindow({ children, className, border = true }: any) {
  return (
    <div
      className={clsx(
        "relative shadow-xl flex bg-slate-800 rounded-xl dark:bg-slate-900/70 dark:backdrop-blur dark:ring-1 dark:ring-inset dark:ring-white/10 w-full",
        className
      )}
    >
      <div className="relative w-full flex flex-col">
        <div
          className={clsx(
            "flex-none",
            border && "border-b border-slate-500/30"
          )}
        >
          <div className="flex items-center h-8 space-x-1.5 px-3">
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
          </div>
        </div>
        <div className="relative min-h-0 flex-auto flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}

export function getClassNameForToken({ types, empty }: any) {
  const typesSize = types.length;
  if (typesSize === 1 && types[0] === "plain") {
    return empty ? "inline-block" : undefined;
  }
  return [...types, empty ? "inline-block" : "token"].join(" ");
}

CodeWindow.Code = forwardRef<any, any>(
  (
    {
      lines = 0,
      showLineNumbers = true,
      initialLineNumber = 1,
      overflow = true,
      wrap = false,
      className,
      children,
      language,
    }: any,
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(className, "w-full flex-auto flex min-h-0", {
          "overflow-auto": overflow,
        })}
      >
        <div className="w-full relative flex-auto">
          <pre
            className={clsx(
              "flex min-h-full text-sm leading-6",
              language && `language-${language}`
            )}
          >
            {showLineNumbers && (
              <div
                aria-hidden="true"
                className="hidden lg:block text-slate-600 flex-none py-4 pr-4 text-right select-none w-[3.125rem]"
              >
                {Array.from({ length: lines }).map((_, i) =>
                  i === 0 ? (
                    i + initialLineNumber
                  ) : (
                    <Fragment key={i + initialLineNumber}>
                      <br />
                      {i + initialLineNumber}
                    </Fragment>
                  )
                )}
              </div>
            )}
            <code
              className={clsx(
                "flex-auto relative block text-slate-50",
                {
                  "overflow-auto": overflow,
                  "whitespace-pre-wrap": wrap,
                  "p-4": showLineNumbers,
                },
                language && `language-${language}`
              )}
            >
              {children}
            </code>
          </pre>
        </div>
      </div>
    );
  }
);

CodeWindow.Code.displayName = "Code";
