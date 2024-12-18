import {useCallback, useEffect, useState} from "react";
import {Button, Label, Radio, Slider} from "keep-react";
import {EToneSettings, ICampaign, IChangeCampaignRequest, IToneOfVoice} from "../../../../types/Campaigns.type.ts";
import {observer} from "mobx-react";

interface Props {
  campaign: ICampaign;
  onSave: (request: IChangeCampaignRequest, action: (error?: string) => void) => void
}

const DefaultToneOfVoice: IToneOfVoice = {
  use_emoji: EToneSettings.UseSometimes,
  use_hashtag: EToneSettings.UseSometimes,
  languages: [],
  ask_follow_up_questions: 'yes',
  capitalize_some_words: EToneSettings.UseSometimes,
  comment_length: 150,
}

export const CampaignToneOfVoice = observer(({ campaign, onSave }: Props) => {
  const [toneOfVoice, setToneOfVoice] = useState<IToneOfVoice>()

  const handleSave = useCallback(async () => {
    onSave({
      name: campaign.name,
      company_context: campaign.company_context,
      owner_context: campaign.owner_context,
      is_active: campaign.is_active,
      tone_of_voice: toneOfVoice,
    }, () => {})
  }, [onSave, toneOfVoice, campaign])

  const handleEmojisChange = useCallback((event) => {
    setToneOfVoice({ ...toneOfVoice, use_emoji: event.target.value })
  }, [toneOfVoice])
  const handleHashtagsChange = useCallback((event) => {
    setToneOfVoice({...toneOfVoice, use_hashtag: event.target.value})
  }, [toneOfVoice])
  const handleAskFollowUpQuestionChange = useCallback((event) => {
    setToneOfVoice({...toneOfVoice, ask_follow_up_questions: event.target.value})
  }, [toneOfVoice])
  const handleCapitalizeSomeWordsChange = useCallback((event) => {
    setToneOfVoice({...toneOfVoice, capitalize_some_words: event.target.value})
  }, [toneOfVoice])
  const handleCommentLengthChange = useCallback((data) => {
    let value = 150

    if (data[0] === 0) {
      value = 50
    } else if (data[0] === 1) {
      value = 150
    } else if (data[0] === 2) {
      value = 300
    }

    setToneOfVoice({...toneOfVoice, comment_length: value})
  }, [toneOfVoice])

  useEffect(() => {
    const value = campaign.tone_of_voice?.use_emoji
      ? campaign.tone_of_voice : DefaultToneOfVoice

    if (value.comment_length === 50) {
      value.comment_length = 0
    } else if (value.comment_length === 150) {
      value.comment_length = 1
    } else if (value.comment_length === 300) {
      value.comment_length = 2
    }

    setToneOfVoice(value)
  }, [campaign])

  if (!toneOfVoice) return null

  return <div className="space-y-6">
    <form className="flex flex-col gap-2" defaultValue={toneOfVoice.use_emoji} onChange={handleEmojisChange}>
      <legend className="mb-1 text-start text-body-3 text-metal-600 dark:text-metal-300">
        Use emojis
      </legend>
      <div className="flex flex-row gap-4">
        <fieldset className="flex items-center gap-2">
          <Radio
            id={EToneSettings.TryToNotUse + '_emojis'}
            name="emojis"
            value={EToneSettings.TryToNotUse}
            checked={toneOfVoice.use_emoji === EToneSettings.TryToNotUse}
          />
          <Label htmlFor={EToneSettings.TryToNotUse + '_emojis'}>Try not to use</Label>
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <Radio
            id={EToneSettings.UseSometimes + '_emojis'}
            name="emojis"
            value={EToneSettings.UseSometimes}
            checked={toneOfVoice.use_emoji === EToneSettings.UseSometimes}
          />
          <Label htmlFor={EToneSettings.UseSometimes + '_emojis'}>Use sometimes</Label>
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <Radio
            id={EToneSettings.IfInPost + '_emojis'}
            name="emojis"
            value={EToneSettings.IfInPost}
            checked={toneOfVoice.use_emoji === EToneSettings.IfInPost}
          />
          <Label htmlFor={EToneSettings.IfInPost + '_emojis'}>Use only if present in original post</Label>
        </fieldset>
      </div>
    </form>
    <form className="flex flex-col gap-2" onChange={handleHashtagsChange}>
      <legend className="mb-1 text-start text-body-3 text-metal-600 dark:text-metal-300">
        Use hashtags
      </legend>
      <div className="flex flex-row gap-4">
        <fieldset className="flex items-center gap-2">
          <Radio
            id={EToneSettings.TryToNotUse + 'hashtags'}
            name="hashtags"
            value={EToneSettings.TryToNotUse}
            checked={toneOfVoice.use_hashtag === EToneSettings.TryToNotUse}
          />
          <Label htmlFor={EToneSettings.TryToNotUse + 'hashtags'}>Try not to use</Label>
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <Radio
            id={EToneSettings.UseSometimes + 'hashtags'}
            name="hashtags"
            value={EToneSettings.UseSometimes}
            checked={toneOfVoice.use_hashtag === EToneSettings.UseSometimes}
          />
          <Label htmlFor={EToneSettings.UseSometimes + 'hashtags'}>Use sometimes</Label>
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <Radio
            id={EToneSettings.IfInPost + 'hashtags'}
            name="hashtags"
            value={EToneSettings.IfInPost}
            checked={toneOfVoice.use_hashtag === EToneSettings.IfInPost}
          />
          <Label htmlFor={EToneSettings.IfInPost + 'hashtags'}>Use only if present in original post</Label>
        </fieldset>
      </div>
    </form>
    <form className="flex flex-col gap-2" defaultValue={toneOfVoice.ask_follow_up_questions} onChange={handleAskFollowUpQuestionChange}>
      <legend className="mb-1 text-start text-body-3 text-metal-600 dark:text-metal-300">
        Ask follow up question
      </legend>
      <div className="flex flex-row gap-4">
        <fieldset className="flex items-center gap-2">
          <Radio id="yes" name="question" value="yes" checked={toneOfVoice.ask_follow_up_questions === 'yes'} />
          <Label htmlFor="yes">Yes, ask if relevant</Label>
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <Radio id="no" name="question" value="no" checked={toneOfVoice.ask_follow_up_questions === 'no'} />
          <Label htmlFor="no">No</Label>
        </fieldset>
      </div>
    </form>
    <form className="flex flex-col gap-2">
      <legend className="mb-1 text-start text-body-3 text-metal-600 dark:text-metal-300">
        Comment length
      </legend>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div className="text-start text-body-4 text-metal-600 dark:text-metal-300">Short</div>
          <div className="text-start text-body-4 text-metal-600 dark:text-metal-300">Medium</div>
          <div className="text-start text-body-4 text-metal-600 dark:text-metal-300">Large</div>
        </div>
        <Slider
          className="mt-2"
          min={0}
          max={2}
          defaultValue={[toneOfVoice.comment_length]}
          onValueChange={handleCommentLengthChange}
        />
        <div className="flex flex-row justify-between">
          <div className="text-start text-body-5 text-metal-600 dark:text-metal-300">50 words</div>
          <div className="text-start text-body-5 text-metal-600 dark:text-metal-300">150 words</div>
          <div className="text-start text-body-5 text-metal-600 dark:text-metal-300">300 words</div>
        </div>
      </div>
    </form>
    <form className="flex flex-col gap-2" onChange={handleCapitalizeSomeWordsChange}>
      <legend className="mb-1 text-start text-body-3 text-metal-600 dark:text-metal-300">
        Capitalize SOME words to stress importance?
      </legend>
      <div className="flex flex-row gap-4">
        <fieldset className="flex items-center gap-2">
          <Radio
            id={EToneSettings.TryToNotUse + '_capitalize'}
            name="capitalize"
            value={EToneSettings.TryToNotUse}
            checked={toneOfVoice.capitalize_some_words === EToneSettings.TryToNotUse}
          />
          <Label htmlFor={EToneSettings.TryToNotUse + '_capitalize'}>Try not to use</Label>
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <Radio
            id={EToneSettings.UseSometimes + '_capitalize'}
            name="capitalize"
            value={EToneSettings.UseSometimes}
            checked={toneOfVoice.capitalize_some_words === EToneSettings.UseSometimes}
          />
          <Label htmlFor={EToneSettings.UseSometimes + '_capitalize'}>Use sometimes</Label>
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <Radio
            id={EToneSettings.IfInPost + '_capitalize'}
            name="capitalize"
            value={EToneSettings.IfInPost}
            checked={toneOfVoice.capitalize_some_words === EToneSettings.IfInPost}
          />
          <Label htmlFor={EToneSettings.IfInPost + '_capitalize'}>Use only if present in original post</Label>
        </fieldset>
      </div>
    </form>
    <div className="w-full flex justify-start mt-4">
      <Button onClick={handleSave}>Save</Button>
    </div>
  </div>
})