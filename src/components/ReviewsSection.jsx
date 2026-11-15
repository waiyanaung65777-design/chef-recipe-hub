import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Camera, Trash2, Send, ThumbsUp, ShieldCheck, Sparkles } from 'lucide-react';
import { fetchReviews, submitReview, removeReview } from '../lib/supabase';

export default function ReviewsSection({ recipeId, adminUser, onReviewAdded }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [cookedImage, setCookedImage] = useState('');
  const [showPhotoInput, setShowPhotoInput] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [recipeId]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await fetchReviews(recipeId);
      setReviews(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) {
      alert('အမည်နှင့် မှတ်ချက်ကို ထည့်သွင်းပေးပါခင်ဗျာ!');
      return;
    }

    setSubmitting(true);
    try {
      const newReview = await submitReview({
        recipe_id: recipeId,
        user_name: userName.trim(),
        rating,
        comment: comment.trim(),
        cooked_image: cookedImage.trim() || null,
        created_at: new Date().toISOString()
      });

      setReviews(prev => [newReview, ...prev]);
      setComment('');
      setCookedImage('');
      setShowPhotoInput(false);
      if (onReviewAdded) onReviewAdded(newReview);
    } catch (err) {
      alert('Review တင်ရာတွင် အမှားဖြစ်ပေါ်ပါသည်: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('ဤ Review ကို ဖျက်ရန် သေချာပါသလား?')) return;
    try {
      await removeReview(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (err) {
      alert('ဖျက်၍မရပါ: ' + err.message);
    }
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-8 border border-stone-200 shadow-xs space-y-6 sm:space-y-8">
      
      {/* Header & Stats (Mobile Responsive Stack) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4 sm:pb-6">
        <div>
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-orange-600" />
            <h2 className="font-black text-base sm:text-xl text-stone-900">
              သုံးသပ်ချက်နှင့် အဆင့်သတ်မှတ်ချက်များ
            </h2>
          </div>
          <p className="text-3xs sm:text-xs text-stone-500 mt-0.5">
            ဒီဟင်းချက်နည်းကို စမ်းသပ်ချက်ပြုတ်ဖူးပါက အကြံပြုချက် မျှဝေပေးခဲ့ပါ
          </p>
        </div>

        {/* Rating Score Badge */}
        <div className="flex items-center gap-2.5 bg-amber-50 px-3 py-2 rounded-2xl border border-amber-200/80 self-start sm:self-auto shrink-0">
          <div>
            <span className="font-black text-lg sm:text-2xl text-stone-900">{avgRating}</span>
            <span className="text-3xs text-stone-500"> / ၅.၀</span>
          </div>
          <div className="flex text-amber-500">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${star <= Math.round(avgRating) ? 'fill-current' : 'text-stone-300'}`}
              />
            ))}
          </div>
          <span className="text-2xs font-bold text-amber-900">
            ({reviews.length} ဦး)
          </span>
        </div>
      </div>

      {/* Review Submission Form */}
      <form onSubmit={handleSubmit} className="bg-stone-50/80 rounded-2xl p-3.5 sm:p-5 border border-stone-200/80 space-y-3 sm:space-y-4">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
          <span className="text-xs font-bold text-stone-800">
            အဆင့်သတ်မှတ်ချက် (Rating) -
          </span>

          {/* Star selector */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                type="button"
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="p-1 text-amber-500 transition-transform hover:scale-125 cursor-pointer"
              >
                <Star
                  className={`w-5 h-5 ${(hoverRating || rating) >= star ? 'fill-current' : 'text-stone-300'}`}
                />
              </button>
            ))}
            <span className="text-xs font-bold text-stone-700 ml-1">
              {rating} ကြယ်
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <input
            type="text"
            required
            placeholder="သင့်အမည် (ဥပမာ - မေသူ / ကိုကျော်)"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500"
          />

          <button
            type="button"
            onClick={() => setShowPhotoInput(!showPhotoInput)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <Camera className="w-4 h-4 text-orange-600" />
            <span className="truncate">{showPhotoInput ? 'ပုံဖျက်မည်' : 'ဟင်းပုံတင်မည် (I Cooked This)'}</span>
          </button>
        </div>

        {showPhotoInput && (
          <div className="space-y-1.5 animate-in fade-in">
            <input
              type="url"
              placeholder="ဟင်းဓာတ်ပုံ Image URL ထည့်ပါ (ဥပမာ - https://...)"
              value={cookedImage}
              onChange={e => setCookedImage(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-xs focus:ring-2 focus:ring-orange-500"
            />
            {cookedImage && (
              <div className="h-20 w-20 rounded-xl overflow-hidden border border-stone-300 mt-2">
                <img src={cookedImage} alt="Dish Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        )}

        <textarea
          rows={3}
          required
          placeholder="ဒီဟင်းချက်နည်းနဲ့ ပတ်သက်ပြီး သင့်ရဲ့ အတွေ့အကြုံ (သို့) အကြံပြုချက်ကို ရေးပေးပါ..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? 'တင်နေပါသည်...' : 'Review တင်မည်'}</span>
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="space-y-3.5">
        {loading ? (
          <p className="text-center text-xs text-stone-400 py-6">Reviews များကို ခေါ်ယူနေပါသည်...</p>
        ) : reviews.length > 0 ? (
          reviews.map(item => (
            <div
              key={item.id}
              className="p-3.5 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-100 text-orange-700 font-black flex items-center justify-center text-xs">
                    {item.user_name ? item.user_name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-black text-xs sm:text-sm text-stone-900">
                        {item.user_name}
                      </span>
                      {item.cooked_image && (
                        <span className="px-1.5 py-0.2 rounded-full text-3xs font-extrabold bg-emerald-100 text-emerald-800">
                          🍳 ချက်ပြုတ်ပြီးသူ
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${s <= item.rating ? 'fill-current' : 'text-stone-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-3xs text-stone-400">
                        {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'မကြာသေးမီက'}
                      </span>
                    </div>
                  </div>
                </div>

                {adminUser && (
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Comment text */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                {item.comment}
              </p>

              {/* Cooked Dish Photo */}
              {item.cooked_image && (
                <div className="pt-1">
                  <img
                    src={item.cooked_image}
                    alt="Cooked dish"
                    className="h-32 sm:h-44 rounded-xl object-cover border border-stone-200 shadow-2xs cursor-pointer"
                    onClick={() => window.open(item.cooked_image, '_blank')}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-stone-400 space-y-1">
            <MessageSquare className="w-6 h-6 mx-auto text-stone-300" />
            <p className="text-xs font-semibold">ဤဟင်းချက်နည်းအတွက် Review မရှိသေးပါ။</p>
            <p className="text-3xs">ပထမဆုံး သုံးသပ်ချက် ပေးပို့သူ ဖြစ်လာပါ!</p>
          </div>
        )}
      </div>

    </div>
  );
}
