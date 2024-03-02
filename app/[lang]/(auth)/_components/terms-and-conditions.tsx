

export const TermsAndConditions = ({ t }: { t: any }) => {
  return (
    <p className="px-8 text-center text-sm text-muted-foreground">{t.label} <a
      className="underline underline-offset-4 hover:text-primary" href="/terms">{t.termsLink}</a> &amp; <a
        className="underline underline-offset-4 hover:text-primary" href="/privacy">{t.privacyLink}</a>.</p>
  )
}