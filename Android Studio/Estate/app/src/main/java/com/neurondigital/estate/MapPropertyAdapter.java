package com.neurondigital.estate;

import android.content.Context;
import android.graphics.Typeface;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.RecyclerView.ViewHolder;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;
import com.squareup.picasso.RequestCreator;

import java.text.DecimalFormat;
import java.util.List;

/**
 * Property Adapter to show property cards in list
 */
public class MapPropertyAdapter extends RecyclerView.Adapter<ViewHolder> {

    List<Property> properties;
    Context context;
    private AdapterView.OnItemClickListener onItemClickListener;
    Typeface robotoMedium;

    MapPropertyAdapter(List<Property> properties, AdapterView.OnItemClickListener onItemClickListener, Context context) {
        this.properties = properties;
        this.context = context;
        this.onItemClickListener = onItemClickListener;
        robotoMedium = Typeface.createFromAsset(context.getAssets(), "Roboto-Medium.ttf");
    }

    public void addItems(List<Property> properties) {
        this.properties.addAll(properties);
    }


    /**
     * Holds the property screen elements to avoid creating them multiple times
     */
    public class PropertyViewHolder extends ViewHolder implements View.OnClickListener {
        CardView cv;
        TextView name, price;
        AspectRatioImageView image;

        PropertyViewHolder(View itemView) {
            super(itemView);
            cv = (CardView) itemView.findViewById(R.id.card_view);
            image = (AspectRatioImageView) itemView.findViewById(R.id.image);
            name = (TextView) itemView.findViewById(R.id.property_name);
            price = (TextView) itemView.findViewById(R.id.property_price);

            //set image on click listener
            image.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            //passing the clicked position to the parent class
            onItemClickListener.onItemClick(null, view, getAdapterPosition(), view.getId());
        }
    }


    @Override
    public int getItemCount() {
        return properties.size();
    }


    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View v = null;
        v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.property_card_map, viewGroup, false);
        ViewHolder rvh = new PropertyViewHolder(v);
        return rvh;
    }


    @Override
    public void onBindViewHolder(final ViewHolder propertyViewHolder, final int i) {
        //set property name
        ((PropertyViewHolder) propertyViewHolder).name.setTypeface(robotoMedium);
        ((PropertyViewHolder) propertyViewHolder).name.setText(properties.get(i).name);

        //set price inn 1 column mode
        DecimalFormat dFormat = new DecimalFormat("####,###,###");
        ((PropertyViewHolder) propertyViewHolder).price.setText(context.getString(R.string.currency) + dFormat.format(properties.get(i).saleprice));
        

        //load property image with picasso
        if (properties.get(i).imageUrl != null) {
            RequestCreator r = Picasso.with(context).load(properties.get(i).imageUrl[0]).placeholder(R.drawable.loading);
            r.into(((PropertyViewHolder) propertyViewHolder).image);
        }
    }


    @Override
    public void onAttachedToRecyclerView(RecyclerView recyclerView) {
        super.onAttachedToRecyclerView(recyclerView);
    }

}